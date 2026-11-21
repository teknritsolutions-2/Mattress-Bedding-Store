const lines = {
  layers: '<path d="m2 9 10-6 10 6-10 6zM2 13l10 6 10-6M2 17l10 6 10-6"/>',
  bed: '<path d="M2 19V9m20 10V9M2 16h20M4 12V6h16v6M2 13l2-2h16l2 2M6 10V8h5v2m2 0V8h5v2"/>',
  fabric:
    '<path d="m3 8 12-5 6 4-12 6zM3 8v4l6 5 12-5V7M3 14v3l6 5 12-5M9 13v4"/>',
  shop: '<path d="M4 11v10h16V11M2 10l2-7h16l2 7c-1 3-4 3-5 0-1 3-4 3-5 0-1 3-4 3-5 0-1 3-4 3-5 0ZM9 21v-6h6v6"/>',
  moon: '<path d="M20 14a8 8 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  menu: '<path d="M2 5h20M2 12h20M2 19h20"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  up: '<path d="m5 14 7-7 7 7"/>',
};
export const icon = (name) =>
  '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
  lines[name] +
  "</svg>";
