import { root, page, money } from "./site-config.js?v=4";

export function productImage(product, card = false) {
  const image = card && product.cardImage ? product.cardImage : product.image;
  const width =
    card && product.cardImage ? product.cardImageWidth : product.imageWidth;
  const height =
    card && product.cardImage ? product.cardImageHeight : product.imageHeight;
  return `<img ${card ? 'loading="lazy"' : ""} width="${width}" height="${height}" src="${root}assets/images/${image}.webp" alt="${product.imageAlt}">`;
}

export function dismissDialog(dialog, trigger) {
  dialog.querySelector("button").onclick = () => dialog.close();
  dialog.addEventListener(
    "close",
    () => {
      dialog.remove();
      trigger.focus();
    },
    { once: true },
  );
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
}

export function showDetail(product, preferredSize, trigger) {
  const dialog = document.createElement("dialog");
  dialog.className = "detail";
  dialog.setAttribute("aria-labelledby", "detail-name");
  const specs = [
    ["Construction", product.construction],
    ["Materials", product.material],
    ["Firmness", product.firmness],
    ["Thickness", product.thickness],
    ["Loft", product.loft],
    ["Fill", product.fill],
    ["Shape", product.shape],
    ["Features", product.features?.join(" · ")],
    ["Care", product.care],
  ];
  dialog.innerHTML = `<div class="detail-toolbar"><button class="tool detail-close" type="button" aria-label="Close details">×</button></div>
    <div class="detail-layout">
      <figure>${productImage(product)}</figure>
      <div class="detail-body">
        <div class="eyebrow">${[product.type, product.subtype].filter(Boolean).join(" · ")}</div>
        <h2 id="detail-name">${product.name}</h2><p>${product.description}</p>
        <label>Choose size<select></select></label>
        <p class="variant" aria-live="polite" dir="ltr"></p>
        <a class="btn">Plan a visit for this item</a>
      </div>
    </div>
    <section class="detail-specs" aria-labelledby="detail-specs-title">
      <h3 id="detail-specs-title">Specifications &amp; care</h3>
      <dl>${specs
        .filter(([, value]) => value)
        .map(
          ([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`,
        )
        .join("")}</dl>
    </section>`;
  const select = dialog.querySelector("select");
  product.variants.forEach((v) => select.add(new Option(v.size, v.size)));
  if (product.variants.some((v) => v.size === preferredSize))
    select.value = preferredSize;
  function update() {
    const variant = product.variants.find((item) => item.size === select.value);
    dialog.querySelector(".variant").textContent =
      variant.dimensions.replace(/^(\d+ × \d+)/, "$1 cm") +
      " · " +
      money(variant.price) +
      " indicative";
    dialog.querySelector(".detail-body .btn").href =
      page("contact") +
      "?" +
      new URLSearchParams({ product: product.id, size: variant.size }) +
      "#visit";
  }
  select.onchange = update;
  update();
  dismissDialog(dialog, trigger);
  document.body.append(dialog);
  dialog.showModal();
}
