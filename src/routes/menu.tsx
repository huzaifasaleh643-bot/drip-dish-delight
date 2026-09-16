import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MenuTabs } from "@/components/MenuTabs";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Drip Coffee · Bakery · Kitchen" },
      { name: "description", content: "Specialty coffee, organic matcha and kitchen plates served daily in Gulberg, Lahore." },
      { property: "og:title", content: "Menu — Drip" },
      { property: "og:description", content: "Coffee, matcha and kitchen at Drip Gulberg." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5 animate-fade-in">
            The Menu
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1] max-w-3xl text-balance animate-rise">
            Brewed, whisked & plated — <span className="italic">daily.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            A short list, made well. Our menu is small on purpose — every item earns its place on the counter.
          </p>
        </div>
      </section>
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <MenuTabs />
        </div>
      </section>
    </SiteLayout>
  );
}
