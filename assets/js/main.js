import { icon } from "./icons.js?v=5";
import { policy } from "./site-config.js?v=5";
const doc = document.documentElement;
const drawer = document.querySelector("#drawer");
const opener = document.querySelector(".menu-toggle");
const home = document.querySelector(".home-menu");
function refresh() {
  document.querySelectorAll("[data-theme]:is(button)").forEach((el) => {
    el.innerHTML = icon(doc.dataset.theme === "dark" ? "sun" : "moon");
    el.ariaLabel =
      "Switch to " +
      (doc.dataset.theme === "dark" ? "light" : "dark") +
      " theme";
  });
  document.querySelectorAll("[data-dir]").forEach((el) => {
    el.textContent = doc.dir === "rtl" ? "LTR" : "RTL";
    el.ariaLabel = "Switch direction to " + el.textContent;
  });
}
document
  .querySelectorAll("[data-icon]")
  .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
refresh();
document.addEventListener("click", (event) => {
  if (event.target.closest("button[data-theme]")) {
    doc.dataset.theme = doc.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("fold-theme", doc.dataset.theme);
    } catch {}
    refresh();
  }
  if (event.target.closest("[data-dir]")) {
    doc.dir = doc.dir === "rtl" ? "ltr" : "rtl";
    try {
      localStorage.setItem("fold-dir", doc.dir);
    } catch {}
    refresh();
  }
  if (!home.contains(event.target)) home.open = false;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && home.open) {
    home.open = false;
    home.querySelector("summary").focus();
  }
});
opener.onclick = () => {
  drawer.showModal();
  opener.ariaExpanded = "true";
  drawer.querySelector("[data-close]").focus();
};
drawer.querySelector("[data-close]").onclick = () => drawer.close();
drawer.onclick = (e) => {
  if (e.target === drawer && e.clientX > drawer.getBoundingClientRect().right)
    drawer.close();
};
drawer.addEventListener("close", () => {
  opener.ariaExpanded = "false";
  opener.focus();
});
drawer
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => drawer.close()));
matchMedia("(min-width: 1240px)").addEventListener("change", (e) => {
  if (e.matches && drawer.open) drawer.close();
});
const topButton = document.querySelector(".to-top");
let scrollFrame;
function showTop() {
  topButton.hidden = window.scrollY < 450;
  if (topButton.hidden || topButton.matches(":focus")) {
    topButton.removeAttribute("data-obstructed");
    return;
  }
  const { left, right, top, bottom } = topButton.getBoundingClientRect();
  const interactive =
    "img, svg, figure, p, h1, h2, h3, dt, dd, a, button, input, select, textarea, summary, [role=combobox], [role=listbox]";
  const obscuresContent = [left + 2, (left + right) / 2, right - 2].some((x) =>
    [top + 2, (top + bottom) / 2, bottom - 2].some((y) =>
      document
        .elementsFromPoint(x, y)
        .some((el) => !topButton.contains(el) && el.closest(interactive)),
    ),
  );
  topButton.toggleAttribute("data-obstructed", obscuresContent);
}
function scheduleTop() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    showTop();
  });
}
window.addEventListener("scroll", scheduleTop, { passive: true });
window.addEventListener("resize", scheduleTop);
new ResizeObserver(scheduleTop).observe(document.body);
topButton.addEventListener("blur", scheduleTop);
showTop();
topButton.onclick = () => {
  window.scrollTo({ top: 0 });
  document.querySelector("header .brand").focus({ preventScroll: true });
};
const policies = document.querySelector("#policies");
if (policies)
  policies.innerHTML = policy
    .map(
      ([title, body]) =>
        "<details><summary>" +
        title +
        "</summary><p>" +
        body +
        "</p></details>",
    )
    .join("");
