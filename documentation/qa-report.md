# Fold & Field sitewide polish

The baseline is commit `41e60552`. The attachment contained the written descriptions. Before captures were rendered from that baseline.

| Area | Correction |
| --- | --- |
| Section rhythm | Reused spacing tokens for headings, intro copy, forms and card groups. Added dedicated clearance above the pillow technology cards and balanced Sleep & Care title-to-card spacing. |
| Readability | Relaxed heading line height and comparison specifications. Body text and selector options retain readable sizes. |
| Dropdowns | Form selectors expand in the document directly below their fields, with scrollable option lists and viewport clearance. The native elements still supply form values and validation. Keyboard, touch, RTL, type-ahead, Escape and required-field behavior were checked. |
| Home 2 | Comparison rows align image, specifications and price on wider screens and become compact stacked summaries on phones. Bedding-layer cards have equal track widths and stretch to match each row. The five-step links use consistent number alignment and deliberate tablet and mobile wrapping. |
| Back-to-top | The fixed button follows the reading direction and temporarily hides where it would cover photography, text or controls. Verified that it reappears at the footer and returns the page to the top. |

## Verification

- Checked all seven pages at 320, 360, 390, 430, 768, 820, 960, 1024, 1180, 1280 and 1440 px in light LTR, light RTL, dark LTR and dark RTL.
- Reviewed full-page and focused captures at 390, 768, 1024 and 1440 px, plus dark RTL full pages at 390, 820 and 1180 px.
- Tested 266 expanded dropdown instances across seven widths and two display combinations. Covered the mattress finder, price by size, filters and sorting, product dialogs, and contact choices. Checked placement, scrolling, focus and Escape dismissal. The baseline browser captures showed focused native selects, while the revised captures show the actual expanded lists.
- Ran the shopping and enquiry journeys at phone, tablet and desktop sizes. Verified catalogue filtering and sorting, three-product comparison, variant pricing and dimensions, product and size preselection, validation, request review and editing, clipboard copy and download.
- Confirmed the drawer still opens from the physical left, display preferences persist, and policy and navigation interactions work. Ran the touch finder, variant and visit handoff in Chromium and WebKit.
- Confirmed that the 12 mattress and 16 bedding products and photography remain unchanged. Updated HTML and module release URLs to version 5.

---

# Fold & Field targeted visual fixes

The preserved baseline is commit `787ea1fe`. The attachment contained the written defect descriptions, so the before captures were rendered from that commit. The separate 15-project lessons document did not turn up in the workspace or Drive search. The relevant fallback checks in the brief were applied.

| Finding | Correction |
| --- | --- |
| Home 2 layering links | Removed persistent underlines. The five links retain a keyboard focus outline, hover treatment and their original category destinations. The steps fit five across on desktop, three plus two on tablets, and stack on narrow phones. |
| Home 1 Sleep & Care | Replaced the dark shot with a 1440 × 960 daylit bedroom by Lotus Design N Print. The photo follows the height of the content on desktop, and the section stacks on narrower displays. Added room below the intro and removed hard line breaks inherited from the HTML source. |
| Mattress catalogue | Replaced the four people-containing photographs for Hearth Coil, Sable Latex Hybrid, Ridge Support and Turn Dual Feel. Keel Zoned Support also received a full-mattress view. All five photos are from The Sleep Judge under CC BY 2.0. The card and detail views use the same subject. |
| Understand mattress layers | Replaced the dated photograph with an original vector diagram of the cover, comfort layer, transition layer and support core. It is labelled as an illustrative arrangement. |
| Product details | Balanced the photo and purchase controls in the upper area. Specifications and care span the width below. The close button stays reachable while scrolling, and image credits are accessible from the legal row in the footer. |
| Questions by product | Added guidance about confirming terms for multiple-item purchases. Wide screens show four cards in a two-by-two grid, with a single column on narrow screens. |
| Footer | Moved Photography Credits out of Visit & Support into the secondary legal row on all seven pages. |
| Sitewide image and layout audit | Inspected all 12 mattress images visually, checked image dimensions and crops, and corrected the Home 2 bedroom image metadata. Adjusted tablet layouts for construction, pillow guidance, room picks and related products. |

## Verification

- Captured and reviewed before and after views at 390, 768, 1024 and 1440 px. Also captured all seven pages in dark RTL at 390 and 1024 px.
- Checked all seven pages at 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1180, 1280, 1440 and 1920 px in light LTR, light RTL, dark LTR and dark RTL.
- Tested Spring, memory foam, orthopaedic, contour pillow, pillow-protector and duvet dialogs, plus longer-content models, across phone, tablet and desktop. Checked image decoding, internal scrolling, close button, Escape, backdrop and focus restoration.
- Tested category, size and firmness filters, price sorting, three-product comparison, size-specific dimensions and price updates, both product-to-visit handoffs, form validation, request review and editing, clipboard copying and the downloaded text file.
- Tested the Home dropdown, drawer placement and scroll lock, focus and keyboard navigation, theme and direction persistence, policy accordions, back-to-top and the photography link.
- Matched all 12 mattress and 16 bedding records against the baseline for IDs, specifications, variants and prices. Revalidated references to 71 credited WebP assets and removed obsolete files. Static CSS and JavaScript URLs use version 4.

The photos represent mattress categories and materials. Final specifications, availability and prices remain subject to store confirmation. See the [photography inventory](asset-credits.html) for individual image sources, licences and crops.

---

# Fold & Field visual correction

The comparison baseline is Git commit `eb41f299`. The supplied attachment contained the written descriptions of the 15 visual findings. It did not include the screenshot files. New before captures were rendered directly from the preserved commit.

| Area | Correction |
| --- | --- |
| Brand and colour | Porcelain and cool gray in light mode, graphite and slate in dark mode, and restrained steel-blue accents. The folded-F SVG is used in the header, compact drawer, footer and favicon. |
| Photography | 28 different model references with composed 3:2 card assets and wider detail originals. Selected full-form photography for the featured mattresses, distinct contour and latex pillow imagery, and material-specific bedding views. The public credits record all 44 source photos and their modifications. |
| Home 1 | Shorter retail hero, four aligned featured cards, full-width construction showcase, compact room picks, care grid and visit checklist. |
| Home 2 | Proportional size outlines, linked comfort choices, model specification rows with size-specific prices, a five-step bedding sequence and a compact construction matrix. |
| Mattresses and bedding | Broader mattress cards, responsive catalogue columns, aligned specifications and prices, selected comparison states, a panoramic bedding banner, a fabric guide and a coordinated bedding strip. |
| About, policies and contact | Linked fit decisions, a short checklist, grouped policy questions and easier-to-scan enquiry paths. |
| Public copy | Concise captions and one indicative-pricing note per catalogue. Licensing details are accessible from the footer and product detail dialogs. |

## Verification

Browser checks ran in Playwright with Brave. The revised site and baseline were served locally under separate project-style subpaths.

- Rendered before and after captures of all seven storefront pages at 390, 768 and 1440 px and took individual before and after captures for the 15 described findings. The full-page captures included mobile dark RTL, tablet light LTR and desktop light LTR.
- Ran overflow and display preference checks across all seven pages at 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1180, 1280, 1440 and 1920 px, in all four theme and direction combinations.
- Ran mattress and bedding customer journeys at 390, 820 and 1440 px. Checked filters, price sorting, variant dimensions and pricing, three-model comparison, enquiry preselection, validation, review, editing, copy and download. Also checked the Home 2 price selector, navigation, policy accordions, back-to-top, and persisted display settings.
- Compared catalogue records with the baseline. All 12 mattress and 16 bedding records retained their original specifications, care guidance and price variants. Confirmed unique primary photo files and matching intrinsic image dimensions.
- Product photography represents the category or material. Final specifications, inventory and prices require confirmation from the store.

---

## Previous storefront release

The original release is preserved in Git at commit `09dfb6b`. The makeover retains the seven-page static architecture and all seven original product IDs. The new retail palette uses charcoal (#24262b), off-white (#fafaf8) and terracotta (#a34832), with peach accents in dark mode. Self-hosted DM Sans now covers headings and body text.

### Pages and shopping tools

| Page | Changes |
| --- | --- |
| Home 1 | Full-width bedroom banner, five shopping categories, four curated mattress cards, finder, construction and bedroom care features, and shop-the-room picks. |
| Home 2 | A separate bed-building path with size and feel links, three different mattress picks, a pillow guide, bedding layers and a room styling example. |
| About | Advice on fit, construction, fabrics, shortlisting and preparing a visit. |
| Mattresses | 12 models, combined filters, name and price sorting, detailed size and price updates, and comparison for up to three mattresses. Includes a construction photo, layer guide and size guide. |
| Pillows & Bedding | 16 products, category browsing, pillow filters for loft, shape, fill and firmness, plus textile and care guides. |
| Trial & Returns | Preserved the disclosures and added a four-step enquiry process, product-specific questions and a preselected policy enquiry. |
| Contact | Photo-led introduction, five enquiry pathways, visit preparation tips, FAQs and the editable request review with copy and download. |

### Photography and research

Removed all eleven AI-generated photos and the responsive derivative. The site uses 35 distinct photographs from Unsplash and Wikimedia Commons. Example products use representative imagery, including real mattress surfaces and photographed construction examples. The [asset inventory](asset-credits.md) records source pages, photographer, license, dimensions, modifications and placement.

[Construction and textile research](technology.md) covers linked Bonnell springs, individually wrapped coils, hybrids, latex, gel and open-cell memory foam, zoned and reinforced support, pillow loft and fill, passive cooling textiles, and bedding fabrics.

### Browser verification

- Used Playwright with Brave against a local static HTTP server at the repository-style subpath `/mattress-store/`.
- Checked all seven pages at 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1180, 1280, 1440 and 1920 px in light and dark themes, in both LTR and RTL. Checked horizontal overflow and captured mobile, tablet, desktop and full-page screenshots for visual review.
- Tested mattress category links, combined size/type/firmness filters, price order, clear filters, size-specific details, three-item comparison and comparison reset at 390, 820 and 1440 px.
- Tested enquiry preselection, invalid phone/email and past-date rejection, review, edits, clipboard contents and the downloaded file.
- Tested bedding category and pillow shape filters, the contour memory foam pillow’s specifications and size, mattress-field visibility and the bedding request review.
- Exercised the desktop Home menu, compact drawer’s physical-left position in both directions, Escape, policy disclosures and enquiry preselection, back-to-top, and theme and direction persistence across pages.
- Decoded the images across all seven pages and checked for broken HTTP requests and uncaught browser errors.

### Business details

Models, variant specifications and INR prices are illustrative. Store contact information, inventory, final prices, eligibility, trial and return terms, and warranty details require confirmation from the business. The form prepares a request on the visitor’s device for sharing with the store.
