import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CheckoutProvider } from "./checkout/CheckoutProvider";
import { CheckoutDrawer } from "./checkout/CheckoutDrawer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const revealSelector = "h1, h2, h3, p, article, img, button, a, [data-reveal-item]";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => {
        section.classList.add("is-visible");
        section.querySelectorAll(revealSelector).forEach((item) => item.classList.add("is-visible"));
      });
      return;
    }

    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      section.querySelectorAll<HTMLElement>(revealSelector).forEach((item, index) => {
        item.classList.add("stagger-reveal");
        item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 770)}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(revealSelector).forEach((item) => item.classList.add("is-visible"));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section, index) => {
      section.setAttribute("data-reveal-order", String(index + 1));
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <CheckoutProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CheckoutDrawer />
      </div>
    </CheckoutProvider>
  );
}
