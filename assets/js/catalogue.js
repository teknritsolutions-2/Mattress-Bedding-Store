import { enhanceSelect, syncSelect } from "./select-menu.js?v=5";
import {
  mattresses,
  featuredMattressIds,
  guidedMattressIds,
} from "./products-data.js?v=5";
import { bedding } from "./bedding-data.js?v=5";
import { page, money } from "./site-config.js?v=5";
import { showDetail, productImage } from "./product-details.js?v=5";
import { mountComparison } from "./comparison.js?v=5";

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
      const [width, length] = variant.dimensions.split(" × ").map(Number);
      const outline = target.classList.contains("guide-size-selector")
        ? `<span class="size-outline" aria-hidden="true" style="--bed-width:${width * 0.32}px;--bed-length:${length * 0.32}px"></span>`
        : "";
      return `<a href="${page("products")}?size=${encodeURIComponent(size)}#catalogue">${outline}<h3>${size}</h3><span><bdi dir="ltr">${variant.dimensions} cm</bdi></span><small>Example dimensions</small></a>`;
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
      const curation = target.classList.contains("curation");
      return `<article class="card">
      <div class="product-img">${productImage(p, true)}</div>
      <div class="card-body">
        <div class="eyebrow">${p.type}</div>
        <h3>${p.name}</h3>
        ${
          curation
            ? ""
            : `<p class="card-spec">${[p.subtype || p.material, ...specs].join(" · ")}</p>
        <small>${p.variants.map((v) => v.size).join(" · ")}</small>`
        }
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
  bindDetails(target, () => size);
  if (canCompare) comparison.bind(target);
}

function bindDetails(target, selectedSize) {
  target.querySelectorAll("button[data-id]").forEach((button) => {
    button.onclick = () =>
      showDetail(byId.get(button.dataset.id), selectedSize(), button);
  });
}

function renderGuide(target) {
  const models = guidedMattressIds.map((id) => byId.get(id));
  target.classList.remove("cards");
  target.innerHTML = `<label class="guide-size">Price by size
    <select><option value="">Starting price</option></select></label>
    <div class="guide-models">${models
      .map(
        (p) => `<article>
      <div class="product-img">${productImage(p, true)}</div>
      <div class="guide-specs">
        <h3>${p.name}</h3>
        <dl><dt>Feel</dt><dd>${p.firmness}</dd>
        <dt>Build</dt><dd>${p.subtype}</dd>
        <dt>Height</dt><dd>${p.thickness}</dd></dl>
        <div class="card-foot"><strong data-price="${p.id}" aria-live="polite"></strong>
        <button class="text-link" type="button" data-id="${p.id}" aria-label="View details for ${p.name}">View details</button></div>
      </div></article>`,
      )
      .join("")}</div>`;
  const sizeField = target.querySelector("select");
  fillOptions(sizeField, sizesFor(models));
  function updatePrices() {
    const size = sizeField.value;
    target.querySelectorAll("[data-price]").forEach((label) => {
      const p = byId.get(label.dataset.price);
      const variant = p.variants.find((v) => v.size === size);
      label.textContent = size
        ? variant
          ? money(variant.price)
          : "Size not offered"
        : "From " + money(indicatedPrice(p));
    });
  }
  sizeField.onchange = updatePrices;
  enhanceSelect(sizeField);
  updatePrices();
  bindDetails(target, () => sizeField.value);
}

const featured = document.querySelector("#featured");
if (featured) {
  if (currentPage === "home2") renderGuide(featured);
  else
    render(
      featuredMattressIds.map((id) => byId.get(id)),
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
    form.querySelectorAll("select").forEach(syncSelect);
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

form?.querySelectorAll("select").forEach(enhanceSelect);
