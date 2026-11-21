# Fold & Field storefront makeover

The original release is preserved in Git at commit `09dfb6b`. The makeover retains the seven-page static architecture and all seven original product IDs. The new retail palette uses charcoal (#24262b), off-white (#fafaf8) and terracotta (#a34832), with peach accents in dark mode. Self-hosted DM Sans now covers headings and body text.

## Pages and shopping tools

| Page | Changes |
| --- | --- |
| Home 1 | Full-width bedroom banner, five shopping categories, four curated mattress cards, finder, construction and bedroom care features, and shop-the-room picks. |
| Home 2 | A separate bed-building path with size and feel links, three different mattress picks, a pillow guide, bedding layers and a room styling example. |
| About | Advice on fit, construction, fabrics, shortlisting and preparing a visit. |
| Mattresses | 12 models, combined filters, name and price sorting, detailed size and price updates, and comparison for up to three mattresses. Includes a construction photo, layer guide and size guide. |
| Pillows & Bedding | 16 products, category browsing, pillow filters for loft, shape, fill and firmness, plus textile and care guides. |
| Trial & Returns | Preserved the disclosures and added a four-step enquiry process, product-specific questions and a preselected policy enquiry. |
| Contact | Photo-led introduction, five enquiry pathways, visit preparation tips, FAQs and the editable request review with copy and download. |

## Photography and research

Removed all eleven AI-generated photos and the responsive derivative. The site uses 35 distinct photographs from Unsplash and Wikimedia Commons. Example products use representative imagery, including real mattress surfaces and photographed construction examples. The [asset inventory](asset-credits.md) records source pages, photographer, license, dimensions, modifications and placement.

[Construction and textile research](technology.md) covers linked Bonnell springs, individually wrapped coils, hybrids, latex, gel and open-cell memory foam, zoned and reinforced support, pillow loft and fill, passive cooling textiles, and bedding fabrics.

## Browser verification

- Used Playwright with Brave against a local static HTTP server at the repository-style subpath `/mattress-store/`.
- Checked all seven pages at 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1180, 1280, 1440 and 1920 px in light and dark themes, in both LTR and RTL. Checked horizontal overflow and captured mobile, tablet, desktop and full-page screenshots for visual review.
- Tested mattress category links, combined size/type/firmness filters, price order, clear filters, size-specific details, three-item comparison and comparison reset at 390, 820 and 1440 px.
- Tested enquiry preselection, invalid phone/email and past-date rejection, review, edits, clipboard contents and the downloaded file.
- Tested bedding category and pillow shape filters, the contour memory foam pillow’s specifications and size, mattress-field visibility and the bedding request review.
- Exercised the desktop Home menu, compact drawer’s physical-left position in both directions, Escape, policy disclosures and enquiry preselection, back-to-top, and theme and direction persistence across pages.
- Decoded the images across all seven pages and checked for broken HTTP requests and uncaught browser errors.

## Business details

Models, variant specifications and INR prices are illustrative. Store contact information, inventory, final prices, eligibility, trial and return terms, and warranty details require confirmation from the business. The form prepares a request on the visitor’s device for sharing with the store.
