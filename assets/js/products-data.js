// Dimensions are width × length in centimetres for these illustrative models.
export const mattressSizes = {
  Single: "91 × 190",
  Double: "137 × 190",
  Queen: "152 × 198",
  King: "183 × 198",
};

// Detail image dimensions, alternative text and card crop dimensions.
const photographs = {
  spring: [
    1100,
    941,
    "A quilted mattress with a blue side panel and cream pillows",
    900,
    600,
  ],
  "hearth-spring-profile": [
    1024,
    768,
    "Cream spring mattress with a quilted top on a bed frame",
    900,
    600,
  ],
  "boxspring-mattress": [
    1100,
    688,
    "Cream mattress and box-spring set",
    900,
    600,
  ],
  "sable-latex-hybrid-bed": [
    1024,
    768,
    "White latex hybrid mattress on a timber bed frame",
    900,
    600,
  ],
  "willow-memory": [
    1200,
    900,
    "A white foam mattress on a bed frame",
    900,
    600,
  ],
  "loam-gel-mattress": [
    1200,
    900,
    "A foam mattress with a white cover and coloured piping",
    900,
    600,
  ],
  "drift-foam-mattress": [
    1156,
    565,
    "Side profile of a foam mattress with a white top and grey border",
    848,
    565,
  ],
  "vale-foam-layers": [
    1200,
    675,
    "Cutaway view of foam mattress layers",
    900,
    600,
  ],
  "ridge-support-profile": [
    1024,
    768,
    "A foam mattress with a quilted white cover and dark grey border",
    900,
    600,
  ],
  "keel-foam-mattress": [
    1024,
    576,
    "White mattress with a deep grey side panel on a timber bed frame",
    864,
    576,
  ],
  "pillowtop-mattress": [
    1100,
    1073,
    "A white tufted pillow-top mattress",
    900,
    600,
  ],
  "turn-foam-profile": [
    1024,
    768,
    "Striped cream foam mattress on a dark bed frame",
    900,
    600,
  ],
};

function mattress({ image, prices, dimensions = mattressSizes, ...model }) {
  const [imageWidth, imageHeight, imageAlt, cardImageWidth, cardImageHeight] =
    photographs[image];
  return {
    productGroup: "mattress",
    ...model,
    image: "retail/" + image,
    imageWidth,
    imageHeight,
    imageAlt,
    cardImage: "retail/" + image + "-card",
    cardImageWidth,
    cardImageHeight,
    variants: Object.entries(prices).map(([size, price]) => ({
      size,
      price,
      dimensions: dimensions[size],
    })),
  };
}

export const featuredMattressIds = [
  "meadow-spring",
  "willow-foam",
  "ridge-support",
  "sable-latex",
];
export const guidedMattressIds = ["loam-gel", "bank-hybrid", "keel-zoned"];

export const mattresses = [
  mattress({
    id: "meadow-spring",
    name: "Meadow Spring",
    type: "Spring",
    subtype: "Pocket Spring",
    firmness: "Medium",
    thickness: "20 cm",
    image: "spring",
    material: "Pocketed steel springs, polyurethane foam and quilted knit",
    construction:
      "A quilted comfort layer sits over individually wrapped coils.",
    description: "A buoyant feel with a gently cushioned surface.",
    features: ["Individually wrapped coils", "Quilted top"],
    care: "Rotate head to foot periodically. Spot-clean the cover and let it dry fully.",
    prices: { Single: 14900, Double: 19900, Queen: 23900, King: 26900 },
  }),
  mattress({
    id: "hearth-bonnell",
    name: "Hearth Coil",
    type: "Spring",
    subtype: "Bonnell Spring",
    firmness: "Firm",
    thickness: "17 cm",
    image: "hearth-spring-profile",
    material: "Connected steel coils, felt insulator and fibre quilting",
    construction:
      "Linked hourglass coils flex together beneath a felt pad and quilted cover.",
    description:
      "A shallow comfort layer keeps the feel close to the spring unit.",
    features: ["Connected coil unit", "Felt insulator pad"],
    care: "Use an even base and rotate head to foot. Blot marks with a lightly damp cloth.",
    prices: { Single: 11900, Double: 15900, Queen: 18900, King: 22900 },
  }),
  mattress({
    id: "bank-hybrid",
    name: "Bank Hybrid",
    type: "Spring",
    subtype: "Pocket Spring Hybrid",
    firmness: "Medium",
    thickness: "25 cm",
    image: "boxspring-mattress",
    material:
      "Memory foam, transition foam, pocket springs and cotton-blend ticking",
    construction:
      "Memory foam and a transition layer sit on a pocket spring core with firmer perimeter coils.",
    description:
      "A deeper foam surface paired with a distinct spring response.",
    features: ["Layered foam comfort", "Firmer perimeter coils"],
    care: "Use a compatible base and spot-clean the ticking. Keep the mattress upright only for transport.",
    prices: { Double: 24900, Queen: 28900, King: 32900 },
  }),
  mattress({
    id: "sable-latex",
    name: "Sable Latex Hybrid",
    type: "Spring",
    subtype: "Latex Hybrid",
    firmness: "Medium",
    thickness: "26 cm",
    image: "sable-latex-hybrid-bed",
    material: "Perforated latex foam, pocket springs and stretch-knit cover",
    construction:
      "A spring core sits under a perforated layer of resilient latex foam.",
    description:
      "Compare its quicker rebound with the slower recovery of memory foam.",
    features: ["Perforated latex", "Pocket spring base"],
    care: "Protect the cover from spills. Air it indoors and keep it out of direct sunlight.",
    prices: { Double: 28700, Queen: 32900, King: 38900 },
  }),
  mattress({
    id: "willow-foam",
    name: "Willow Memory Foam",
    type: "Memory Foam",
    subtype: "Classic Memory Foam",
    firmness: "Plush",
    thickness: "18 cm",
    image: "willow-memory",
    material: "Viscoelastic polyurethane, dense base foam and knit ticking",
    construction:
      "A slow-recovery comfort layer rests on a dense foam support base.",
    description:
      "A closer, slower-settling feel for those who like a little give.",
    features: ["Slow-recovery foam", "Spring-free support core"],
    care: "Use a breathable protector. Blot spills gently and avoid soaking the foam.",
    prices: { Double: 18900, Queen: 22900, King: 25900 },
  }),
  mattress({
    id: "loam-gel",
    name: "Loam Gel Foam",
    type: "Memory Foam",
    subtype: "Gel-Infused Memory Foam",
    firmness: "Plush",
    thickness: "22 cm",
    image: "loam-gel-mattress",
    material: "Gel-infused viscoelastic foam, base foam and stretch knit",
    construction:
      "A gel-infused memory foam comfort layer sits over a firmer polyurethane base.",
    description: "A deep, contouring surface with a gel additive in the foam.",
    features: ["Gel-infused foam", "Stretch-knit cover"],
    care: "Blot marks on the cover gently. Allow it to air dry before adding bedding.",
    prices: { Single: 17400, Double: 21900, Queen: 25900, King: 29900 },
  }),
  mattress({
    id: "drift-open-cell",
    name: "Drift Open-Cell",
    type: "Memory Foam",
    subtype: "Open-Cell Memory Foam",
    firmness: "Medium",
    thickness: "21 cm",
    image: "drift-foam-mattress",
    material:
      "Open-cell memory foam, polyurethane foam and mesh-knit side panels",
    construction:
      "The comfort foam has connected pores, with mesh-knit fabric at the sides.",
    description: "A moderately cushioned surface that settles gradually.",
    features: ["Connected pores in comfort foam", "Mesh-knit sides"],
    care: "Use a well-supported bed base and air the surface before replacing the bedding.",
    prices: { Single: 16900, Double: 20900, Queen: 24900, King: 28900 },
  }),
  mattress({
    id: "vale-layered",
    name: "Vale Layered Foam",
    type: "Memory Foam",
    subtype: "Layered Memory Foam",
    firmness: "Medium",
    thickness: "24 cm",
    image: "vale-foam-layers",
    material:
      "Memory foam, resilient transition foam and high-density base foam",
    construction:
      "Three layers take the feel from a slow-settling surface to a firmer base.",
    description:
      "A graduated feel with less initial sink than a thicker plush layer.",
    features: ["Three-layer build", "Resilient transition layer"],
    care: "Spot-clean the cover and rotate head to foot periodically.",
    prices: { Double: 23900, Queen: 27900, King: 31900 },
  }),
  mattress({
    id: "ridge-support",
    name: "Ridge Support",
    type: "Orthopaedic",
    subtype: "Firm Support Foam",
    firmness: "Firm",
    thickness: "22 cm",
    image: "ridge-support-profile",
    material: "Firm polyurethane foam and quilted stretch-knit cover",
    construction:
      "A thin quilted layer sits on firm comfort foam and a dense support core.",
    description: "A level, firmer surface with a light layer of cushioning.",
    features: ["Firm foam core", "Shallow quilted top"],
    care: "Support the mattress on an even base. Brush the cover gently and air it regularly.",
    prices: { Single: 16900, Queen: 25900, King: 28900 },
  }),
  mattress({
    id: "keel-zoned",
    name: "Keel Zoned Support",
    type: "Orthopaedic",
    subtype: "Zoned Support Foam",
    firmness: "Firm",
    thickness: "23 cm",
    image: "keel-foam-mattress",
    material: "Profiled polyurethane foam, dense base foam and stretch knit",
    construction:
      "Shallower channels through the centre make that area firmer than the outer zones.",
    description:
      "A firm surface with different amounts of give along the mattress.",
    features: ["Profiled foam zoning", "Symmetric head-to-foot layout"],
    care: "Use an even base. Check the cover care label before washing.",
    prices: { Single: 19900, Double: 23900, Queen: 28900, King: 32900 },
  }),
  mattress({
    id: "brink-firm-hybrid",
    name: "Brink Firm Hybrid",
    type: "Orthopaedic",
    subtype: "Firm Pocket Hybrid",
    firmness: "Firm",
    thickness: "25 cm",
    image: "pillowtop-mattress",
    material:
      "Firm comfort foam, pocketed steel springs and perimeter foam rails",
    construction:
      "A shallow foam layer covers a pocket spring unit with firm foam rails around the edge.",
    description: "A firm top with a responsive core and reinforced perimeter.",
    features: ["Pocket spring support", "Perimeter foam rails"],
    care: "Use a compatible base. Avoid folding the mattress and blot any spills.",
    prices: { Double: 26900, Queen: 31900, King: 35900 },
  }),
  mattress({
    id: "turn-dual-feel",
    name: "Turn Dual Feel",
    type: "Orthopaedic",
    subtype: "Reversible Foam",
    firmness: "Firm",
    thickness: "20 cm",
    image: "turn-foam-profile",
    material:
      "Medium and firm polyurethane comfort layers around a dense central core",
    construction:
      "The firm face and medium face use different comfort layers around the same core.",
    description:
      "Try the firm face first or turn it over for a little more surface give.",
    features: ["Medium reverse face", "Reversible construction"],
    care: "Check the face labels before turning. Spot-clean and let the cover air dry.",
    prices: { Single: 15900, Double: 19900, Queen: 23900, King: 27900 },
  }),
];
