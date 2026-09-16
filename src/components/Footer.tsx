import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid gap-14 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl">DRIP</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                // Premium Engine
              </span>
            </div>
            <p className="mt-6 max-w-md font-serif text-2xl leading-snug text-foreground/90">
              A quiet corner of Gulberg dedicated to specialty coffee, slow mornings and craft kitchen plates.
            </p>
          </div>


          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">Visit</h4>
            <p className="flex items-start gap-3 text-sm leading-relaxed">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>Gulberg, Lahore<br />(Near Main Boulevard)</span>
            </p>
            <p className="flex items-start gap-3 text-sm leading-relaxed mt-4">
              <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span className="tabular">Open Daily: 8:00 AM — 12:00 AM (Midnight)</span>
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/menu" className="hover:text-primary transition">Menu</Link></li>
              <li><Link to="/card-deals" className="hover:text-primary transition">Card Deals</Link></li>
              <li><Link to="/our-story" className="hover:text-primary transition">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/drip.lhr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
              <a href="https://www.facebook.com/profile.php?id=61585733121353" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t hairline flex flex-col md:flex-row gap-4 justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Drip Coffee. Zero commission leakage.</span>
          <span>Crafted in Lahore · 0% App Tax</span>
        </div>
      </div>
    </footer>
  );
}
