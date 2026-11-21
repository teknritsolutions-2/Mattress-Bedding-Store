import { mattresses } from "./products-data.js";
import { bedding } from "./bedding-data.js";
import { root, page, money } from "./site-config.js";
import { showDetail } from "./product-details.js";
const products =
  document.body.dataset.page === "bedding" ? bedding : mattresses;
const sizes = [
  ...new Set(products.flatMap((p) => p.variants.map((v) => v.size))),
];
const opts = {
  type: [...new Set(products.map((p) => p.type))],
  size: sizes,
  firmness: [...new Set(products.map((p) => p.firmness).filter(Boolean))],
};
const form = document.querySelector("[data-filter], [data-finder]");
const search = new URLSearchParams(location.search);
if (form)
  for (const [key, items] of Object.entries(opts)) {
    const field = form.elements.namedItem(key);
    if (!field) continue;
    items.forEach((value) => field.add(new Option(value, value)));
    if (items.includes(search.get(key))) field.value = search.get(key);
  }
const sizeLinks = document.querySelector("[data-sizes]");
if (sizeLinks)
  sizes.forEach((size) => {
    const p = products.find((p) => p.variants.some((v) => v.size === size));
    const v = p.variants.find((v) => v.size === size);
    sizeLinks.insertAdjacentHTML(
      "beforeend",
      '<a href="' +
        page("products") +
        "?size=" +
        encodeURIComponent(size) +
        '"><h3>' +
        size +
        "</h3><span>" +
        v.dimensions +
        " cm</span><small>Example model size</small></a>",
    );
  });
function render(items, target, size) {
  target.innerHTML = items
    .map((p) => {
      const v = p.variants.find((item) => item.size === size);
      return (
        '<article class="card"><div class="product-img"><img loading="lazy" width="840" height="560" src="' +
        root +
        "assets/images/" +
        p.image +
        '.webp" alt="' +
        p.name +
        '"></div><div class="card-body"><div class="eyebrow">' +
        p.type +
        (p.firmness ? " · " + p.firmness : "") +
        "</div><h3>" +
        p.name +
        "</h3><p>" +
        p.description +
        "</p><small>" +
        p.variants.map((v) => v.size).join(" · ") +
        '</small><div class="card-foot"><strong>' +
        (v
          ? money(v.price)
          : "From " + money(Math.min(...p.variants.map((v) => v.price)))) +
        '</strong><button class="text-link" data-id="' +
        p.id +
        '">View details</button></div></div></article>'
      );
    })
    .join("");
  if (!items.length)
    target.innerHTML =
      '<div class="empty"><h3>No matching products</h3><p>Try another size or clear the filters to see the full collection.</p></div>';
  target.querySelectorAll("button[data-id]").forEach(
    (button) =>
      (button.onclick = () =>
        showDetail(
          products.find((p) => p.id === button.dataset.id),
          size,
          button,
        )),
  );
}
const featured = document.querySelector("#featured");
if (featured) render(products, featured, "");
if (form?.hasAttribute("data-filter")) {
  function apply() {
    const { type, size, firmness } = Object.fromEntries(new FormData(form));
    const matching = products.filter(
      (p) =>
        (!type || p.type === type) &&
        (!size || p.variants.some((v) => v.size === size)) &&
        (!firmness || p.firmness === firmness),
    );
    const query = new URLSearchParams(
      [...new FormData(form)].filter(([, value]) => value),
    );
    history.replaceState(
      null,
      "",
      location.pathname + (query.size ? "?" + query : ""),
    );
    render(matching, document.querySelector("#results"), size);
    document.querySelector("#count").textContent =
      matching.length + " " + (matching.length === 1 ? "product" : "products");
  }
  form.onchange = apply;
  form.onreset = (e) => {
    e.preventDefault();
    form.querySelectorAll("select").forEach((field) => (field.value = ""));
    apply();
  };
  form.onsubmit = (e) => {
    e.preventDefault();
    apply();
  };
  apply();
}
