import {
  mattresses,
  featuredMattressIds,
  guidedMattressIds,
} from "./products-data.js?v=2";
import { bedding } from "./bedding-data.js?v=2";
import { page, money } from "./site-config.js?v=2";
import { showDetail, productImage } from "./product-details.js?v=2";
import { mountComparison } from "./comparison.js?v=2";

const currentPage = document.body.dataset.page;
const products = currentPage === "bedding" ? bedding : mattresses;
const all = [...mattresses, ...bedding];
const byId = new Map(all.map((product) => [product.id, product]));
const sizesFor = (items) => [
  ...new Set(items.flatMap((p) => p.variants.map((v) => v.size))),
];
const form = document.querySelector("[data-filter], [data-finder]");
const search = new URLSearchParams(location.search);
const qualities = ["type", "firmness", "loft", "fill", "shape"];
const pillowFields = document.querySelector("[data-pillow-filters]");

function fillOptions(field, values) {
  if (!field) return;
  values.forEach((value) => field.add(new Option(value, value)));
}

if (form) {
  for (const key of qualities) {
    fillOptions(form.elements.namedItem(key), [
      ...new Set(products.map((p) => p[key]).filter(Boolean)),
    ]);
  }
  fillOptions(form.elements.namedItem("size"), sizesFor(products));
  for (const field of form.querySelectorAll("select")) {
    const value = search.get(field.name);
    if ([...field.options].some((option) => option.value === value))
      field.value = value;
  }
}

document.querySelectorAll("[data-sizes]").forEach((target) => {
  target.innerHTML = sizesFor(mattresses)
    .map((size) => {
      const variant = mattresses
        .flatMap((p) => p.variants)
        .find((v) => v.size === size);
      return `<a href="${page("products")}?size=${encodeURIComponent(size)}#catalogue"><h3>${size}</h3><span>${variant.dimensions} cm</span><small>Example model size</small></a>`;
    })
    .join("");
});

export function indicatedPrice(product, size) {
  return (
    product.variants.find((v) => v.size === size)?.price ??
    Math.min(...product.variants.map((v) => v.price))
  );
}

const comparison =
  currentPage === "products"
    ? mountComparison(document.querySelector("#comparison"), mattresses)
    : null;

function render(items, target, size = "", canCompare = false) {
  target.innerHTML = items
    .map((p) => {
      const specs =
        p.productGroup === "mattress"
          ? [p.firmness, p.thickness]
          : [p.loft, p.shape].filter(Boolean);
      const price = money(indicatedPrice(p, size));
      return `<article class="card">
      <div class="product-img">${productImage(p, true)}</div>
      <div class="card-body">
        <div class="eyebrow">${p.type}</div>
        <h3>${p.name}</h3>
        <p class="card-spec">${[p.subtype || p.material, ...specs].join(" · ")}</p>
        <small>${p.variants.map((v) => v.size).join(" · ")}</small>
        <div class="card-foot"><strong>${size ? price : "From " + price}</strong>
          <button class="text-link" type="button" data-id="${p.id}" aria-label="View details for ${p.name}">View details</button></div>
        ${canCompare ? `<label class="compare-choice"><input type="checkbox" value="${p.id}" aria-label="Compare ${p.name}">Compare</label>` : ""}
      </div>
    </article>`;
    })
    .join("");
  if (!items.length) {
    target.innerHTML =
      '<div class="empty"><h3>No matching products</h3><p>Change your selection or clear the filters to see the full collection.</p></div>';
  }
  target.querySelectorAll("button[data-id]").forEach((button) => {
    button.onclick = () =>
      showDetail(byId.get(button.dataset.id), size, button);
  });
  if (canCompare) comparison.bind(target);
}

const featured = document.querySelector("#featured");
if (featured) {
  render(
    (currentPage === "home2" ? guidedMattressIds : featuredMattressIds).map(
      (id) => byId.get(id),
    ),
    featured,
  );
}
document.querySelectorAll("[data-curated]").forEach((target) => {
  render(
    target.dataset.curated
      .trim()
      .split(/\s+/)
      .map((id) => byId.get(id))
      .filter(Boolean),
    target,
  );
});

if (form?.hasAttribute("data-filter")) {
  function apply() {
    if (pillowFields) {
      const show = form.elements.type.value === "Pillows";
      pillowFields.hidden = !show;
      pillowFields.disabled = !show;
      if (!show)
        pillowFields
          .querySelectorAll("select")
          .forEach((field) => (field.value = ""));
    }
    const values = new FormData(form);
    const size = values.get("size") || "";
    const matching = products.filter((p) => {
      return (
        (!size || p.variants.some((v) => v.size === size)) &&
        qualities.every((key) => !values.get(key) || p[key] === values.get(key))
      );
    });
    const sort = values.get("sort");
    if (sort === "name") matching.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc" || sort === "price-desc") {
      const direction = sort === "price-asc" ? 1 : -1;
      matching.sort(
        (a, b) =>
          direction * (indicatedPrice(a, size) - indicatedPrice(b, size)),
      );
    }
    const query = new URLSearchParams([...values].filter(([, value]) => value));
    history.replaceState(
      null,
      "",
      location.pathname + (query.size ? "?" + query : "") + location.hash,
    );
    render(
      matching,
      document.querySelector("#results"),
      size,
      Boolean(comparison),
    );
    document.querySelector("#count").textContent =
      matching.length + (matching.length === 1 ? " product" : " products");
  }
  form.onchange = apply;
  form.onreset = (event) => {
    event.preventDefault();
    form.querySelectorAll("select").forEach((field) => (field.value = ""));
    apply();
  };
  form.onsubmit = (event) => {
    event.preventDefault();
    apply();
  };
  apply();
}
