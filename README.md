# Fold & Field

A seven-page, buildless mattress and bedding storefront. The collection includes 12 mattress models and 16 bedding items with illustrative INR prices, configured dimensions and credited representative photographs. Visitors can prepare a store visit request in their browser.

## Run locally

From the project root, run `python3 -m http.server 8000` and open `http://localhost:8000/`. Serve the files over HTTP so the browser can load native ES modules.

## Pages

| Entry point | Purpose |
| --- | --- |
| `index.html` | Storefront, featured mattresses, finder, sleep notes and bedding |
| `pages/home2.html` | Comfort, size and layering guide |
| `pages/about.html` | Approach to product selection |
| `pages/products.html` | Filterable and sortable mattress collection with comparison for up to three models |
| `pages/bedding.html` | Pillow finder and catalogue of sheets, pillowcases, duvets and protectors |
| `pages/trial-returns.html` | Policy questions and configurable guidance |
| `pages/contact.html` | Local visit request preparation and review |

## Change the collection

Edit `assets/js/products-data.js` or `assets/js/bedding-data.js`. Keep product IDs stable so saved enquiry links continue to work. Each variant supplies its own size, dimensions in centimetres and numeric INR price. The mattress module uses a shared map for the example frames. A model with different dimensions can supply its own variant array. Filters, cards, details, size links and visit selections read these modules.

Edit confirmed terms and contact details in `assets/js/site-config.js`. An empty contact field is omitted. Before launch, replace the illustrative products, photography and pricing with approved business information. Update the illustrative catalogue labels and policy introduction when those details have been verified.

## Visit requests

Contact details stay in the current form and review screen. Editing preserves entered values. Copy and download produce a plain-text request the visitor can share. Only display preferences are stored in local storage. A real booking or enquiry delivery flow requires a business-supplied integration.

## Release on GitHub Pages

Publish this directory at the root of the intended Pages branch. Set Pages to deploy from that branch's root. The entry point is `index.html`, with relative links throughout and a root `.nojekyll` file. There is no build command or dependency installation.

For future releases, increment the version parameter of changed entry stylesheets and scripts in the HTML. When changing an imported module, update its import URL (or version its filename) and the importing entry's version together. Give replaced image assets versioned filenames and update the catalogue or page reference.

The deployment repository is [Mattress-Bedding-Store](https://github.com/teknritsolutions-2/Mattress-Bedding-Store). GitHub Pages serves the root of the main branch.

## Documentation

- [Image inventory and credits](documentation/asset-credits.md)
- [QA and completion report](documentation/qa-report.md)
- [DM Sans font licence](assets/fonts/dm-sans-OFL.txt)
- [Construction and textile research](documentation/technology.md)
