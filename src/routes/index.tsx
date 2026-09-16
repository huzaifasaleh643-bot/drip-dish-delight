import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { MenuTabs } from "@/components/MenuTabs";
import { CardDealsChecker } from "@/components/CardDealsChecker";
import heroImg from "@/assets/hero-coffee.jpg";
import catCoffee from "@/assets/cat-coffee.jpg";
import catMatcha from "@/assets/cat-matcha.jpg";
import catKitchen from "@/assets/cat-kitchen.jpg";
import catBakery from "@/assets/cat-bakery.jpg";
import ambianceImg from "@/assets/ambiance.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const categories = [
  { title: "Specialty Coffee", desc: "Single origins, V60, espresso.", img: catCoffee },
  { title: "Organic Matcha", desc: "Ceremonial grade, whisked fresh.", img: catMatcha },
  { title: "The Kitchen", desc: "Slow-cooked, plated with care.", img: catKitchen },
  { title: "Artisanal Bakery", desc: "Sourdough, pastries, daily.", img: catBakery },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-background">
        <img
          src={heroImg}
          alt="Espresso pouring into a white cup at Drip Coffee"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(235,190,156,0.18),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pb-20 lg:pb-28 pt-32 w-full text-foreground">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="h-px w-10 bg-primary" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary tabular">
              Gulberg · Lahore · Est. 2024
            </p>
          </div>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-5xl text-balance animate-rise text-foreground">
            Pure Taste. <span className="italic text-cream">Zero Commission</span> Leakage.
          </h1>
          <p className="mt-8 max-w-xl text-base lg:text-lg leading-relaxed text-muted-foreground animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Specialty coffee and an artisanal kitchen — ordered directly. Every rupee of margin stays inside the enterprise, not siphoned by aggregators like Foodpanda. Direct checkout. 0% app tax.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-5 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-cream transition-colors font-medium"
            >
              Explore Our Menu
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Open till midnight
            </span>
          </div>

          {/* Performance matrix strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border max-w-3xl animate-fade-up" style={{ animationDelay: "0.45s" }}>
            {[
              { k: "0%", v: "App Tax" },
              { k: "100%", v: "Margin Kept" },
              { k: "<5min", v: "Direct Order" },
              { k: "24/7", v: "WhatsApp Line" },
            ].map((s) => (
              <div key={s.v} className="bg-background px-5 py-4">
                <p className="font-serif text-2xl text-primary tabular">{s.k}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                What we serve
              </p>
              <h2 className="font-serif text-4xl lg:text-6xl leading-tight">
                Four crafts, <span className="italic">one counter.</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Every cup, plate and loaf at Drip is made in-house — from beans roasted weekly to sourdough fermented overnight.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {categories.map((c, i) => (
              <div
                key={c.title}
                className="group relative bg-background overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-2xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 lg:py-36 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              The Signature Menu
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl leading-tight max-w-2xl mx-auto text-balance">
              A short, considered <span className="italic">list.</span>
            </h2>
          </div>
          <MenuTabs />
          <div className="text-center mt-14">
            <Link to="/menu" className="text-xs uppercase tracking-[0.25em] border-b border-foreground pb-1 hover:opacity-70 transition">
              See full menu
            </Link>
          </div>
        </div>
      </section>

      {/* CARD DEALS */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Bank Card Deals
              </p>
              <h2 className="font-serif text-4xl lg:text-6xl leading-tight">
                Up to <span className="italic">40% off</span> with your card.
              </h2>
            </div>
            <Link to="/card-deals" className="text-xs uppercase tracking-[0.25em] border-b border-foreground pb-1 hover:opacity-70 transition">
              View all offers
            </Link>
          </div>
          <CardDealsChecker />
        </div>
      </section>

      {/* AMBIANCE */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
            <img
              src={ambianceImg}
              alt="Drip Coffee Gulberg interior"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="bg-foreground text-primary-foreground p-10 lg:p-20 flex items-center">
            <div className="max-w-md">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-6">
                The Gulberg Branch
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
                A quiet room in a loud city.
              </h2>
              <p className="mt-6 text-base leading-relaxed opacity-80">
                Warm wood, soft pendants and a marble counter — the Gulberg space was built around the rhythm of a long espresso pour and a slow conversation.
              </p>
              <Link to="/our-story" className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] border-b border-primary-foreground pb-1">
                Read our story <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
