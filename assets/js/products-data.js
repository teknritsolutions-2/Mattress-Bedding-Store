// Dimensions are width × length in centimetres for these illustrative models.
const sizes = {
  Single: "91 × 190",
  Double: "137 × 190",
  Queen: "152 × 198",
  King: "183 × 198",
};
function variants(prices) {
  return Object.entries(prices).map(([size, price]) => ({
    size,
    price,
    dimensions: sizes[size],
  }));
}
export const mattresses = [
  {
    id: "meadow-spring",
    name: "Meadow Spring",
    type: "Spring",
    firmness: "Medium",
    thickness: "20 cm",
    image: "mattresses/spring",
    material: "Pocket springs beneath a quilted comfort layer",
    description: "A buoyant feel with a gently cushioned surface.",
    care: "Rotate head to foot periodically. Spot-clean the cover and let it dry fully.",
    variants: variants({
      Single: 14900,
      Double: 19900,
      Queen: 23900,
      King: 26900,
    }),
  },
  {
    id: "willow-foam",
    name: "Willow Memory Foam",
    type: "Memory Foam",
    firmness: "Plush",
    thickness: "18 cm",
    image: "mattresses/foam",
    material: "Contouring memory foam over a dense foam base",
    description:
      "A closer, slower-settling feel for those who like a little give.",
    care: "Use a breathable protector. Blot spills gently and avoid soaking the foam.",
    variants: variants({ Double: 18900, Queen: 22900, King: 25900 }),
  },
  {
    id: "ridge-support",
    name: "Ridge Support",
    type: "Orthopaedic",
    firmness: "Firm",
    thickness: "22 cm",
    image: "mattresses/orthopaedic",
    material: "Firm layered support foam with a textured quilted top",
    description: "A level, firmer surface with a light layer of cushioning.",
    care: "Support the mattress on an even base. Brush the cover gently and air it regularly.",
    variants: variants({ Single: 16900, Queen: 25900, King: 28900 }),
  },
];
