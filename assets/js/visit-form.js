import { enhanceSelect, syncSelect } from "./select-menu.js?v=5";
import { mattresses } from "./products-data.js?v=5";
import { bedding } from "./bedding-data.js?v=5";
import { store } from "./site-config.js?v=5";
const form = document.querySelector("#visit-form");
const fields = form.elements;
const review = document.querySelector("#review");
const all = [...mattresses, ...bedding];
const params = new URLSearchParams(location.search);
function options(field, entries) {
  field.replaceChildren(
    ...entries.map(([value, label]) => new Option(label, value)),
  );
}
options(fields.product, [
  ["", "Choose an interest"],
  ["general", "General mattress enquiry"],
  ["sizes", "Bed size enquiry"],
  ["visit", "General store visit"],
  ["bedding", "General bedding enquiry"],
  ["policy", "Policy enquiry"],
  ...all.map((p) => [p.id, p.name]),
]);
const topics = {
  mattress: "general",
  mattresses: "general",
  bedding: "bedding",
  size: "sizes",
  sizes: "sizes",
  policy: "policy",
  visit: "visit",
};
fields.product.value = all.some((p) => p.id === params.get("product"))
  ? params.get("product")
  : Object.hasOwn(topics, params.get("topic"))
    ? topics[params.get("topic")]
    : "";
function sync() {
  const product = all.find((p) => p.id === fields.product.value);
  const isMattress = product
    ? product.productGroup === "mattress"
    : ["general", "sizes", ""].includes(fields.product.value);
  const hasSize = isMattress || !!product;
  fields.category.closest("label").hidden = !isMattress;
  fields.category.disabled = !isMattress;
  fields.size.closest("label").hidden = !hasSize;
  fields.size.disabled = !hasSize;
  const categories =
    product && isMattress
      ? [product.type]
      : [...new Set(mattresses.map((p) => p.type))];
  options(fields.category, [
    ["", "No preference"],
    ...categories.map((s) => [s, s]),
  ]);
  if (product && isMattress) fields.category.value = product.type;
  const sizes = [
    ...new Set(
      (product ? [product] : mattresses).flatMap((p) =>
        p.variants.map((v) => v.size),
      ),
    ),
  ];
  options(fields.size, [["", "No preference"], ...sizes.map((s) => [s, s])]);
  syncSelect(fields.category);
  syncSelect(fields.size);
}
sync();
if ([...fields.size.options].some((o) => o.value === params.get("size")))
  fields.size.value = params.get("size");
fields.product.onchange = sync;
form.querySelectorAll("select").forEach(enhanceSelect);
function today() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
fields.date.min = today();
function validate() {
  fields.date.min = today();
  fields.name.setCustomValidity(
    fields.name.value.trim() ? "" : "Enter your full name.",
  );
  const phone = fields.phone.value.trim();
  fields.phone.setCustomValidity(
    /^\+?[\d\s().-]+$/.test(phone) &&
      /^\d{7,15}$/.test(phone.replace(/\D/g, ""))
      ? ""
      : "Enter a phone number containing 7 to 15 digits.",
  );
  fields.time.setCustomValidity(
    fields.date.value &&
      fields.time.value &&
      new Date(fields.date.value + "T" + fields.time.value) <= new Date()
      ? "Choose a future visit time."
      : "",
  );
}
form.addEventListener("input", validate);
const labels = {
  name: "Full name",
  phone: "Phone",
  email: "Email",
  product: "Product interest",
  category: "Mattress category",
  size: "Size",
  date: "Visit date",
  time: "Preferred time",
  notes: "Notes",
};
let prepared = "";
form.onsubmit = (e) => {
  e.preventDefault();
  validate();
  if (!form.reportValidity()) return;
  const entries = [...new FormData(form)]
    .filter(([, v]) => v.trim())
    .map(([key, v]) => [
      labels[key],
      key === "product" ? fields.product.selectedOptions[0].text : v.trim(),
    ]);
  const dl = review.querySelector("dl");
  dl.replaceChildren();
  for (const [label, value] of entries) {
    const dt = document.createElement("dt"),
      dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    dl.append(dt, dd);
  }
  prepared =
    "Fold & Field — Store visit request\nAwaiting store confirmation\n\n" +
    entries.map(([l, v]) => l + ": " + v).join("\n");
  form.hidden = true;
  review.hidden = false;
  document.querySelector("#feedback").textContent = "";
  review.querySelector("h3").focus();
};
document.querySelector("#edit").onclick = () => {
  review.hidden = true;
  form.hidden = false;
  fields.name.focus();
};
document.querySelector("#copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(prepared);
    document.querySelector("#feedback").textContent = "Request copied.";
  } catch {
    document.querySelector("#feedback").textContent =
      "Clipboard access is unavailable. Use Download request to save your details.";
  }
};
document.querySelector("#download").onclick = () => {
  const url = URL.createObjectURL(
    new Blob([prepared], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "fold-and-field-visit.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  document.querySelector("#feedback").textContent =
    "Request prepared for download. The store must confirm the visit separately.";
};
for (const [key, value] of Object.entries(store))
  if (value) {
    const p = document.createElement("p");
    p.textContent = key + " · " + value;
    document.querySelector("#store-details").append(p);
  }
