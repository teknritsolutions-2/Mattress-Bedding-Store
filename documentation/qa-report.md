# Fold & Field completion report

## Release

The site contains seven physical HTML pages. Home 1 introduces the collection. Home 2 guides shoppers through frame size, firmness and bedding layers. About, Mattresses, Pillows & Bedding, Trial & Returns and Contact complete the site.

Forest green (#263f33), linen (#f7f3e7) and muted sage (#c8d1aa) form the primary palette. Georgia headings pair with self-hosted DM Sans. The folded-layer symbol appears in the wordmark and favicon. The [image inventory](asset-credits.md) covers the eleven original generated images, their subjects and intended use.

Three illustrative mattresses cover spring, memory foam and orthopaedic constructions. Filters combine type, size and firmness. Detail dialogs provide exact configured dimensions, care, materials, thickness and size-specific indicative INR prices. Four bedding products cover pillows, sheets, duvets and protectors and use a separate category filter.

The policy page lists questions to confirm with the business. Visit requests are prepared in the browser, with an editable review, clipboard copy and plain-text download. Production readiness depends on verified inventory, prices, policy terms, contact details and any desired delivery or scheduling service.

## Verification

Tests ran in a headless Brave browser using Playwright and a static Python HTTP server. The site was loaded at the root and under the project-style prefix `/mattress-store/`.

| Check | Result |
| --- | --- |
| Direct loads and layouts | All seven pages passed horizontal-overflow checks at widths 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1180, 1280 and 1440 px. The 768 and 1024 px cases used the requested portrait and landscape heights. |
| Display modes | Tested all four light/dark and LTR/RTL combinations across the matrix. Verified preference controls persisted after navigation. |
| Visual inspection | Captured all pages at 390, 768 and 1440 px in light LTR and dark RTL. Inspected representative contact sheets, the desktop homepage and full-page captures. |
| Mattress journey | At 390, 820 and 1440 px, the Home 1 finder opened a filtered catalogue. Conflicting filters showed the empty state. Clearing restored all three models. |
| Product detail | A Queen Meadow Spring displayed 152 × 198 cm and ₹23,900. Switching to King updated the result to 183 × 198 cm and ₹26,900. |
| Visit request | Verified product and selected size, invalid phone/email and past-date rejection, review, editing, clipboard contents and the downloaded file contents. |
| Bedding journey | Filtered to sheets, chose King in product details, and verified that the visit form preselected the sheet set and hid mattress category. |
| Navigation and policies | Exercised drawer open/Escape, physical-left positioning, desktop Home menu keyboard control, back-to-top, Home 2 size discovery links and policy disclosure. |
| Assets and links | Verified 249 HTML links, asset references and fragment targets. Browser image decoding succeeded on all pages. The final journey run reported zero HTTP errors or uncaught page errors. |

## Previous project issues prevented

Compact navigation activates before desktop links become crowded. The drawer uses a native modal dialog, an explicit physical-left position and body scroll locking. Forms use native select controls with logical padding and inset chevrons. Product photography uses contain sizing while lifestyle photography uses cover. All photo placements are inventoried, and repeated product photos identify the same model. During QA, filter clearing was made synchronous and RTL text handling was adjusted to preserve English sentence punctuation.

The release uses local fonts, local WebP photographs, a responsive hero source, stable relative paths and versioned top-level CSS and script URLs. About, both homepages and the visit form are reachable from shared navigation. The policy and contact pages leave unverified business details configurable.

## Deployment status

The static project-subpath deployment was tested locally. The release destination is the main branch of teknritsolutions-2/Mattress-Bedding-Store. The README includes the branch-root publication settings.
