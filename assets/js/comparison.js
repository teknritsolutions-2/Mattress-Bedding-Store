import { money } from "./site-config.js?v=2";
import { dismissDialog } from "./product-details.js?v=2";

export function mountComparison(target, mattresses) {
  if (!target) return null;
  const selected = new Set();
  target.classList.add("compare-tray");
  target.innerHTML = `<div><strong>Compare mattresses</strong><p role="status">Choose up to three models.</p></div>
    <div class="actions"><button type="button" class="outline" data-clear disabled>Clear selection</button>
    <button type="button" class="btn" data-compare disabled>Compare selected</button></div>`;
  const clear = target.querySelector("[data-clear]");
  const compare = target.querySelector("[data-compare]");
  const status = target.querySelector("[role=status]");
  let cards;

  function sync() {
    clear.disabled = selected.size === 0;
    compare.disabled = selected.size < 2;
    status.textContent = selected.size
      ? `${selected.size} of 3 selected · ${mattresses
          .filter((p) => selected.has(p.id))
          .map((p) => p.name)
          .join(", ")}`
      : "Choose up to three models.";
    cards.querySelectorAll(".compare-choice input").forEach((input) => {
      input.checked = selected.has(input.value);
      input.disabled = selected.size >= 3 && !input.checked;
    });
  }
  clear.onclick = () => {
    selected.clear();
    sync();
  };
  compare.onclick = () => {
    const dialog = document.createElement("dialog");
    dialog.className = "comparison";
    dialog.setAttribute("aria-labelledby", "compare-title");
    dialog.innerHTML = `<button type="button" class="dialog-close tool" aria-label="Close comparison">×</button>
      <h2 id="compare-title">Compare mattresses</h2><p>Starting prices in INR across configured sizes.</p>
      <div class="compare-grid">${mattresses
        .filter((p) => selected.has(p.id))
        .map(
          (p) => `<article>
        <h3>${p.name}</h3>
        <dl><dt>Type</dt><dd>${p.type}</dd>
        <dt>Construction</dt><dd>${p.subtype} · ${p.construction}</dd>
        <dt>Firmness and height</dt><dd>${p.firmness} · ${p.thickness}</dd>
        <dt>Sizes</dt><dd>${p.variants.map((v) => v.size).join(" · ")}</dd>
        <dt>Starting price</dt><dd>${money(Math.min(...p.variants.map((v) => v.price)))}</dd>
        <dt>Features</dt><dd>${p.features.join(" · ")}</dd></dl></article>`,
        )
        .join("")}</div>`;
    dismissDialog(dialog, compare);
    document.body.append(dialog);
    dialog.showModal();
  };

  return {
    bind(grid) {
      cards = grid;
      grid.querySelectorAll(".compare-choice input").forEach(
        (input) =>
          (input.onchange = () => {
            if (input.checked && selected.size < 3) selected.add(input.value);
            if (!input.checked) selected.delete(input.value);
            sync();
          }),
      );
      sync();
    },
  };
}
