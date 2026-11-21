export const root = document.body.dataset.page === "index" ? "./" : "../";
export const page = (name) =>
  root + (name === "index" ? "index.html" : "pages/" + name + ".html");
export const store = { address: "", phone: "", email: "", hours: "" };
export const policy = [
  [
    "Trial eligibility and duration",
    "Trial eligibility and duration are subject to the store’s confirmed policy. Ask which mattress, size and purchase method qualify, and when any trial would begin.",
  ],
  [
    "Product condition and exclusions",
    "Ask what packaging, labels and proof of purchase to keep. Confirm any hygiene conditions for mattresses, pillows, protectors and opened bedding before use.",
  ],
  [
    "Requesting a return",
    "Have your purchase details, product name, size and reason for the request ready. Ask the store for its approved contact channel and instructions before sending an item.",
  ],
  [
    "Pickup and return costs",
    "Confirm who arranges transport, how the item should be packed and whether any fees apply before arranging collection.",
  ],
  [
    "Refunds and exchanges",
    "Ask which resolutions are available for the item. Refund eligibility, timing and payment method await confirmation from the store.",
  ],
  [
    "Damage and warranty",
    "Keep photographs of the item and packaging if you notice damage. Ask the store about its reporting process and the warranty terms for your specific product.",
  ],
];
export const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
