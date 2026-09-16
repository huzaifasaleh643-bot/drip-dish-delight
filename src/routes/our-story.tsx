import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import ambianceImg from "@/assets/ambiance.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Drip Coffee Gulberg, Lahore" },
      { name: "description", content: "The story behind Drip — a specialty coffee, bakery and kitchen concept in Gulberg, Lahore." },
      { property: "og:title", content: "Our Story — Drip" },
      { property: "og:description", content: "A quiet corner of Gulberg." },
      { property: "og:image", content: ambianceImg },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5 animate-fade-in">
            Our Story
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1] text-balance animate-rise">
            Built around a <span className="italic">slow pour.</span>
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <img
            src={ambianceImg}
            alt="Drip interior"
            loading="lazy"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 space-y-8 font-serif text-xl lg:text-2xl leading-relaxed text-foreground/90">
          <p>
            Drip began with a single espresso machine and a stubborn idea — that a city as loud as Lahore deserved a room as quiet as a good cup of coffee.
          </p>
          <p>
            Tucked into a corner of Gulberg, our space pairs single-origin beans roasted weekly with a kitchen that takes its time. Sourdough is fermented overnight. Pasta is hand-rolled. Matcha is whisked, not blended.
          </p>
          <p>
            The menu is intentionally short. We'd rather make a handful of things very well than a hundred things passably.
          </p>
          <p className="text-base text-muted-foreground font-sans pt-6 uppercase tracking-[0.25em]">
            — The Drip Team
          </p>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid sm:grid-cols-3 gap-12 text-center">
          {[
            { k: "2024", v: "Year founded" },
            { k: "1", v: "Branch · Gulberg" },
            { k: "Midnight", v: "Daily close" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-serif text-5xl">{s.k}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
