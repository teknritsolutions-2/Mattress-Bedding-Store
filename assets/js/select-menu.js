// Keep the native control as the source of truth for form values and options.
const controls = new WeakMap();
let nextId = 0;
let openControl;

function close(control) {
  if (openControl !== control) return;
  openControl = undefined;
  control.list.hidden = true;
  control.trigger.setAttribute("aria-expanded", "false");
  control.trigger.removeAttribute("aria-activedescendant");
  control.active = -1;
  control.search = "";
}

function setActive(control, index) {
  const option = control.list.children[index];
  if (!option || option.getAttribute("aria-disabled") === "true") return;
  control.list.children[control.active]?.classList.remove("is-active");
  control.active = index;
  option.classList.add("is-active");
  control.trigger.setAttribute("aria-activedescendant", option.id);

  // Scroll the option list without shifting the page as arrows are pressed.
  const list = control.list.getBoundingClientRect();
  const item = option.getBoundingClientRect();
  if (item.top < list.top) control.list.scrollTop += item.top - list.top;
  if (item.bottom > list.bottom)
    control.list.scrollTop += item.bottom - list.bottom;
}

function revealMenu(control) {
  const dialog = control.select.closest("dialog");
  const header = document.querySelector("body > header");
  const viewport = window.visualViewport;
  const viewportTop = viewport?.offsetTop ?? 0;
  const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight);
  const bounds = dialog?.getBoundingClientRect();
  const toolbarBottom = dialog
    ?.querySelector(".detail-toolbar")
    ?.getBoundingClientRect().bottom;
  const top =
    Math.max(
      viewportTop,
      toolbarBottom ??
        bounds?.top ??
        header?.getBoundingClientRect().bottom ??
        0,
    ) + 12;
  const bottom =
    Math.min(viewportBottom, bounds?.bottom ?? viewportBottom) - 12;
  const trigger = control.trigger.getBoundingClientRect();
  const list = control.list.getBoundingClientRect();
  const offset = Math.min(list.bottom - bottom, trigger.top - top);
  const distance = trigger.top < top ? trigger.top - top : Math.max(0, offset);
  if (distance)
    (dialog ?? window).scrollBy({ top: distance, behavior: "instant" });
}

function open(control) {
  if (control.select.matches(":disabled") || !control.select.length) return;
  if (openControl) close(openControl);
  syncSelect(control.select);
  openControl = control;
  control.list.hidden = false;
  control.trigger.setAttribute("aria-expanded", "true");
  const choices = enabledOptions(control);
  const selected = control.select.selectedIndex;
  setActive(control, choices.includes(selected) ? selected : choices[0]);
  revealMenu(control);
}

function enabledOptions({ list }) {
  return [...list.children].flatMap((option, index) =>
    option.getAttribute("aria-disabled") === "true" ? [] : [index],
  );
}

function commit(control, index) {
  if (!enabledOptions(control).includes(index)) return;
  const changed = control.select.selectedIndex !== index;
  control.select.selectedIndex = index;
  close(control);
  syncSelect(control.select);
  if (changed) {
    control.select.dispatchEvent(new Event("input", { bubbles: true }));
    control.select.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function handleKeys(event, control) {
  const isOpen = openControl === control;
  if (event.key === "Tab") {
    close(control);
    return;
  }
  if (event.key === "Escape" && isOpen) {
    event.preventDefault();
    event.stopPropagation();
    close(control);
    return;
  }
  if (["Enter", " "].includes(event.key)) {
    event.preventDefault();
    if (!isOpen) open(control);
    else if (control.active >= 0) commit(control, control.active);
    return;
  }
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    if (!isOpen) open(control);
    const choices = enabledOptions(control);
    if (!choices.length) return;
    const current = choices.indexOf(control.active);
    const target =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? choices.length - 1
          : isOpen
            ? current + (event.key === "ArrowDown" ? 1 : -1)
            : current;
    setActive(
      control,
      choices[Math.max(0, Math.min(choices.length - 1, target))],
    );
    return;
  }
  if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey)
    return;
  event.preventDefault();
  if (!isOpen) open(control);
  const now = Date.now();
  const letter = event.key.toLocaleLowerCase();
  control.search =
    now - control.lastTyped < 650 ? control.search + letter : letter;
  control.lastTyped = now;
  const repeated = [...control.search].every((char) => char === letter);
  const term = repeated ? letter : control.search;
  const choices = enabledOptions(control);
  const from = Math.max(
    0,
    choices.indexOf(control.active) + (repeated ? 1 : 0),
  );
  const match = [...choices.slice(from), ...choices.slice(0, from)].find(
    (index) =>
      control.list.children[index].textContent
        .toLocaleLowerCase()
        .startsWith(term),
  );
  if (match !== undefined) setActive(control, match);
}

export function syncSelect(select) {
  const control = controls.get(select);
  if (!control) return;
  const { trigger, list, error, id } = control;
  const locked = select.matches(":disabled");
  trigger.tabIndex = locked ? -1 : 0;
  trigger.setAttribute("aria-disabled", String(locked));
  trigger.textContent = select.selectedOptions[0]?.label || "";
  if (select.validity.valid || locked) {
    error.hidden = true;
    trigger.removeAttribute("aria-invalid");
    trigger.removeAttribute("aria-describedby");
  }
  if (openControl === control) close(control);
  list.replaceChildren(
    ...[...select.options].map((option, index) => {
      const item = document.createElement("span");
      item.id = `${id}-option-${index}`;
      item.className = "select-option";
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(option.selected));
      item.setAttribute(
        "aria-disabled",
        String(option.disabled || Boolean(option.closest("optgroup:disabled"))),
      );
      item.dataset.index = index;
      item.textContent = option.label;
      return item;
    }),
  );
}

export function enhanceSelect(select) {
  if (controls.has(select) || select.multiple || select.size > 1) return;
  const label = select.closest("label");
  if (!label || !select.length) return;
  const id = `select-menu-${++nextId}`;
  const name = document.createElement("span");
  name.id = `${id}-label`;
  name.className = "select-label";
  // Preserve the enclosing label and its place in the responsive form grid.
  const textNodes = [...label.childNodes].filter(
    (node) => node.nodeType === Node.TEXT_NODE,
  );
  name.textContent = textNodes
    .map((node) => node.textContent)
    .join("")
    .trim();
  if (!name.textContent) return;
  textNodes.forEach((node) => node.remove());

  const ui = document.createElement("span");
  ui.className = "select-ui";
  const trigger = document.createElement("span");
  trigger.className = "select-trigger";
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-labelledby", name.id);
  trigger.setAttribute("aria-controls", `${id}-list`);
  if (select.required) trigger.setAttribute("aria-required", "true");

  const list = document.createElement("span");
  list.id = `${id}-list`;
  list.className = "select-options";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-labelledby", name.id);
  list.hidden = true;

  const error = document.createElement("span");
  error.id = `${id}-error`;
  error.className = "select-error";
  error.setAttribute("aria-live", "polite");
  error.hidden = true;

  const control = {
    select,
    trigger,
    list,
    error,
    id,
    active: -1,
    search: "",
    lastTyped: 0,
  };
  controls.set(select, control);
  label.prepend(name);
  select.hidden = true;
  ui.append(trigger, list, error);
  select.after(ui);
  syncSelect(select);

  const toggle = () => {
    if (select.matches(":disabled")) return;
    trigger.focus({ preventScroll: true });
    if (openControl === control) close(control);
    else open(control);
  };
  trigger.addEventListener("click", toggle);
  name.addEventListener("click", (event) => {
    event.preventDefault();
    toggle();
  });
  trigger.addEventListener("keydown", (event) => handleKeys(event, control));
  list.addEventListener("mousedown", (event) => event.preventDefault());
  list.addEventListener("click", (event) => {
    const option = event.target.closest("[data-index]");
    if (option) commit(control, Number(option.dataset.index));
  });
  select.addEventListener("change", () => syncSelect(select));
  select.addEventListener("invalid", (event) => {
    event.preventDefault();
    close(control);
    trigger.setAttribute("aria-invalid", "true");
    trigger.setAttribute("aria-describedby", error.id);
    error.textContent = select.validationMessage;
    error.hidden = false;
    const firstInvalid = Array.from(select.form?.elements ?? [select]).find(
      (field) => field.willValidate && !field.validity.valid,
    );
    if (firstInvalid === select) trigger.focus();
  });
}

document.addEventListener("click", (event) => {
  if (
    openControl &&
    !openControl.select.closest("label").contains(event.target)
  )
    close(openControl);
});
