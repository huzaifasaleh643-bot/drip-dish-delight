import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CardDealsChecker } from "@/components/CardDealsChecker";

export const Route = createFileRoute("/card-deals")({
  head: () => ({
    meta: [
      { title: "Card Deals — Drip Coffee Gulberg" },
      { name: "description", content: "Up to 40% off with HBL, Alfalah, Meezan, UBL and more at Drip Coffee, Gulberg Lahore." },
      { property: "og:title", content: "Card Deals — Drip" },
      { property: "og:description", content: "Active bank discounts at Drip Coffee." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5 animate-fade-in">
            Bank Card Deals
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1] max-w-3xl text-balance animate-rise">
            Discounts that <span className="italic">actually</span> work.
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            Pick your bank below to see the active offer. All deals apply at our Gulberg branch on dine-in and takeaway.
          </p>
        </div>
      </section>
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <CardDealsChecker />
          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
            * Discounts cannot be combined with other offers. Terms apply.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
