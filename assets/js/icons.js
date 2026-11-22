const lines = {
  fold: '<path fill="currentColor" stroke="none" d="M4 7a3 3 0 0 1 3-3h13l-5.5 5.5H9.5V12H16l-4.5 4.5h-2V20H4Z"/><path fill="currentColor" stroke="none" opacity=".52" d="M16 9.5 21 4.5V12h-5z"/>',
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
