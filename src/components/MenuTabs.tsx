import { useState } from "react";
import { Plus, Check, ArrowRight } from "lucide-react";
import { useCheckout } from "./checkout/CheckoutProvider";
import latteArt from "@/assets/drip-latte-art.jpg.asset.json";
import espressoBlack from "@/assets/drip-espresso-black.jpg.asset.json";
import espressoGlass from "@/assets/drip-espresso-glass.jpg.asset.json";
import cafeLatte from "@/assets/drip-cafe-latte.jpg.asset.json";
import matchaIced from "@/assets/drip-matcha-iced.jpg.asset.json";
import matchaLatte from "@/assets/drip-matcha-latte.jpg.asset.json";
import spanishIcedLatte from "@/assets/drip-spanish-iced-latte.jpg.asset.json";
import beefChimichurri from "@/assets/drip-beef-chimichurri.jpg.asset.json";
import figRicotta from "@/assets/drip-fig-ricotta.jpg.asset.json";
import trufflePasta from "@/assets/drip-truffle-pasta.jpg.asset.json";

type Item = { id: string; name: string; price: number; description?: string; tag?: string; img: string };
type Category = { key: string; label: string; items: Item[] };

const categories: Category[] = [
  {
    key: "coffee",
    label: "Coffee",
    items: [
      { id: "espresso", name: "Espresso", price: 450, description: "Single origin, double shot. Bold, balanced, full-bodied.", img: espressoBlack.url },
      { id: "v60", name: "V60 Manual Brew", price: 750, description: "Hand-poured pour-over. Bright, clean, nuanced.", img: espressoGlass.url },
      { id: "spanish-latte", name: "Spanish Latte", price: 650, description: "Espresso with condensed milk and silk-steamed milk.", tag: "Best Seller", img: latteArt.url },
      { id: "tiramisu-latte", name: "Tiramisu Latte", price: 720, description: "Espresso, mascarpone cream and a whisper of cocoa.", img: cafeLatte.url },
    ],
  },
  {
    key: "matcha",
    label: "Matcha Series",
    items: [
      { id: "spanish-matcha", name: "Spanish Matcha", price: 780, description: "Ceremonial matcha layered over condensed milk.", img: matchaIced.url },
      { id: "pistachio-matcha", name: "Pistachio Matcha", price: 890, description: "Stone-ground pistachio cream and organic matcha.", tag: "Signature", img: spanishIcedLatte.url },
      { id: "matcha-latte", name: "Matcha Latte", price: 720, description: "Whisked organic matcha and steamed milk.", img: matchaLatte.url },
    ],
  },
  {
    key: "kitchen",
    label: "Kitchen",
    items: [
      { id: "truffle-pasta", name: "Truffle & Bacon Mushroom Pasta", price: 1850, description: "Hand-rolled pasta, wild mushrooms, smoked bacon, truffle.", img: trufflePasta.url },
      { id: "beef-chimichurri", name: "Beef Chimichurri Sandwich", price: 1650, description: "Grilled beef, herb chimichurri, served with patatas bravas.", img: beefChimichurri.url },
      { id: "fig-ricotta", name: "Nutty Fig Ricotta Dip", price: 1250, description: "Whipped ricotta, fig, honey, toasted nuts. In-house sourdough.", img: figRicotta.url },
    ],
  },
];

const fmt = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export function MenuTabs() {
  const [active, setActive] = useState(categories[0].key);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const current = categories.find((c) => c.key === active) ?? categories[0];
  const { addItem, openCheckout } = useCheckout();

  const handleAdd = (item: Item) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded((id) => (id === item.id ? null : id)), 1200);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b hairline pb-6 mb-12">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-all ${
              active === c.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div key={current.key} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-background animate-fade-in">
        {current.items.map((item) => (
          <article
            key={item.id}
            className="group relative bg-background border border-border flex flex-col overflow-hidden animate-fade-up"
            style={{ animationDelay: `${current.items.indexOf(item) * 0.12}s` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              {item.tag && (
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.3em] text-primary-foreground bg-primary px-2 py-1">
                  {item.tag}
                </span>
              )}
              <span className="absolute bottom-3 right-3 font-serif text-xl text-foreground tabular bg-background/70 backdrop-blur-sm px-3 py-1 hairline border">
                {fmt(item.price)}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-5 lg:p-6">
              <h3 className="font-serif text-2xl leading-tight text-foreground">{item.name}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
              )}
              <button
                onClick={() => handleAdd(item)}
                aria-label={`Add ${item.name}`}
                className={`mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 text-[10px] uppercase tracking-[0.28em] transition-all font-medium ${
                  justAdded === item.id
                    ? "bg-cream text-primary-foreground"
                    : "bg-primary text-primary-foreground hover:bg-cream"
                }`}
              >
                {justAdded === item.id ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" /> Add · Zero Friction
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={openCheckout}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-cream transition-colors font-medium"
        >
          Direct Checkout (0% App Tax)
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          No aggregators · Margins stay in-house
        </p>
      </div>
    </div>
  );
}
