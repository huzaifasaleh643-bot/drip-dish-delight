import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useCheckout } from "./checkout/CheckoutProvider";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/card-deals", label: "Card Deals" },
  { to: "/our-story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openCheckout, items } = useCheckout();
  const count = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-bar" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between h-14 lg:h-16">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-xl lg:text-2xl tracking-tight text-foreground">DRIP</span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground hidden sm:block">
            // Premium Engine
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              activeProps={{ className: "text-foreground after:w-full" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCheckout}
          className="hidden lg:inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.25em] bg-primary text-primary-foreground px-4 py-2.5 hover:bg-cream transition-colors font-medium"
        >
          <Zap className="h-3 w-3" strokeWidth={2.5} />
          Direct Checkout
          <span className="opacity-70 normal-case tracking-tight">(0% App Tax)</span>
          {count > 0 && (
            <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] bg-primary-foreground text-primary rounded-full tabular">
              {count}
            </span>
          )}
        </button>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 -mr-2 text-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-bar animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.25em] text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openCheckout();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] bg-primary text-primary-foreground px-5 py-3 hover:bg-cream transition-colors font-medium"
            >
              <Zap className="h-3 w-3" strokeWidth={2.5} />
              Direct Checkout (0% App Tax)
              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] bg-primary-foreground text-primary rounded-full tabular">
                  {count}
                </span>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
