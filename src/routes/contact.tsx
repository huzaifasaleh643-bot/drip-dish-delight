import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Clock, Phone, Instagram, Facebook, Navigation } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Drip Coffee Gulberg" },
      { name: "description", content: "Visit Drip in Gulberg, Lahore. Open daily until midnight." },
      { property: "og:title", content: "Contact — Drip" },
      { property: "og:description", content: "Find Drip in Gulberg, Lahore." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5 animate-fade-in">
            Visit
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-[1] max-w-3xl text-balance animate-rise">
            Come for a cup. <span className="italic">Stay a while.</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-10 lg:p-14 space-y-10">
            <Detail icon={<MapPin className="h-4 w-4" />} label="Address">
              Drip — Coffee · Bakery · Kitchen<br />
              Gulberg, Lahore (Near Main Boulevard)<br />
              Pakistan
            </Detail>
            <Detail icon={<Clock className="h-4 w-4" />} label="Hours">
              Open Daily<br />
              8:00 AM — 12:00 AM (Midnight)
            </Detail>
            <Detail icon={<Phone className="h-4 w-4" />} label="Reservations & Catering">
              <a href="tel:+924200000000" className="hover:opacity-70 transition">+92 42 000 0000</a>
            </Detail>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Follow</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/drip.lhr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 border border-border hover:bg-foreground hover:text-primary-foreground transition-colors"><Instagram className="h-4 w-4" /></a>
                <a href="https://www.facebook.com/profile.php?id=61585733121353" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 border border-border hover:bg-foreground hover:text-primary-foreground transition-colors"><Facebook className="h-4 w-4" /></a>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Drip+Coffee+Gulberg+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-matcha hover:text-matcha-foreground transition-colors"
            >
              <Navigation className="h-4 w-4" />
              Navigate via Google Maps
            </a>
          </div>

          <div className="bg-background min-h-[500px] relative overflow-hidden">
            <iframe
              title="Drip Gulberg map"
              src="https://www.google.com/maps?q=Gulberg+III,Lahore&output=embed"
              className="absolute inset-0 w-full h-full grayscale contrast-110"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
        {icon} {label}
      </p>
      <div className="font-serif text-2xl leading-snug">{children}</div>
    </div>
  );
}
