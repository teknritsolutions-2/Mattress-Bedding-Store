try {
  const doc = document.documentElement;
  doc.dataset.theme =
    localStorage.getItem("fold-theme") === "dark" ? "dark" : "light";
  doc.dir = localStorage.getItem("fold-dir") === "rtl" ? "rtl" : "ltr";
} catch {
  /* Use the document defaults when storage is unavailable. */
}
