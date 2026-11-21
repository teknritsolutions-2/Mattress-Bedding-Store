import { root, page, money } from "./site-config.js";
export function showDetail(product, preferredSize, trigger) {
  const dialog = document.createElement("dialog");
  dialog.className = "detail";
  dialog.setAttribute("aria-labelledby", "detail-name");
  dialog.innerHTML =
    '<button class="dialog-close tool" aria-label="Close details">×</button><img width="840" height="560" alt="" src="' +
    root +
    "assets/images/" +
    product.image +
    '.webp"><div class="detail-body"><div class="eyebrow">' +
    product.type +
    '</div><h2 id="detail-name">' +
    product.name +
    "</h2><p>" +
    product.description +
    "</p><dl><dt>Construction</dt><dd>" +
    product.material +
    "</dd>" +
    (product.firmness
      ? "<dt>Feel &amp; height</dt><dd>" +
        product.firmness +
        " · " +
        product.thickness +
        "</dd>"
      : "") +
    "<dt>Care</dt><dd>" +
    product.care +
    '</dd></dl><label>Choose size<select></select></label><p class="variant" aria-live="polite"></p><a class="btn">Plan a visit for this item</a></div>';
  const select = dialog.querySelector("select");
  product.variants.forEach((v) => select.add(new Option(v.size, v.size)));
  if (product.variants.some((v) => v.size === preferredSize))
    select.value = preferredSize;
  function update() {
    const v = product.variants.find((item) => item.size === select.value);
    dialog.querySelector(".variant").textContent =
      v.dimensions + " cm · " + money(v.price) + " indicative";
    dialog.querySelector("a").href =
      page("contact") +
      "?" +
      new URLSearchParams({ product: product.id, size: v.size }) +
      "#visit";
  }
  select.onchange = update;
  update();
  dialog.querySelector("button").onclick = () => dialog.close();
  dialog.addEventListener(
    "close",
    () => {
      dialog.remove();
      trigger.focus();
    },
    { once: true },
  );
  dialog.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  });
  document.body.append(dialog);
  dialog.showModal();
}
