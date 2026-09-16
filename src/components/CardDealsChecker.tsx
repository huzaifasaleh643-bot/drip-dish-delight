import { useState } from "react";
import { CreditCard, Percent, Calendar } from "lucide-react";

type Deal = { bank: string; discount: string; days: string; note?: string };

const deals: Deal[] = [
  { bank: "HBL", discount: "40% OFF", days: "Mon — Wed", note: "On debit & credit cards" },
  { bank: "Bank Alfalah", discount: "30% OFF", days: "All Week", note: "Credit cards only" },
  { bank: "Meezan Bank", discount: "25% OFF", days: "Thu — Sun", note: "Visa Debit & Credit" },
  { bank: "UBL", discount: "20% OFF", days: "Daily", note: "On dine-in orders" },
  { bank: "Standard Chartered", discount: "35% OFF", days: "Fri — Sun", note: "Premium cards" },
  { bank: "Faysal Bank", discount: "15% OFF", days: "All Week" },
];

export function CardDealsChecker() {
  const [selected, setSelected] = useState<string>(deals[0].bank);
  const current = deals.find((d) => d.bank === selected)!;

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      <div className="lg:col-span-2 bg-foreground text-primary-foreground p-10 lg:p-12 flex flex-col justify-between min-h-[360px]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-6">
            Card Discount Checker
          </p>
          <h3 className="font-serif text-3xl lg:text-4xl leading-tight mb-8">
            Select your bank to reveal today's offer.
          </h3>
          <label className="block text-[10px] uppercase tracking-[0.25em] opacity-60 mb-3">
            Your Bank
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full bg-transparent border-b border-primary-foreground/40 py-3 text-lg focus:outline-none focus:border-primary-foreground appearance-none cursor-pointer"
          >
            {deals.map((d) => (
              <option key={d.bank} value={d.bank} className="bg-foreground text-primary-foreground">
                {d.bank}
              </option>
            ))}
          </select>
        </div>

        <div key={selected} className="mt-10 pt-8 border-t border-primary-foreground/15 animate-fade-up">
          <div className="flex items-baseline gap-3">
            <Percent className="h-5 w-5 opacity-60" />
            <span className="font-serif text-5xl lg:text-6xl">{current.discount}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
            <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {current.days}</span>
            {current.note && <span>· {current.note}</span>}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 grid sm:grid-cols-2 gap-px bg-border">
        {deals.map((d) => (
          <button
            key={d.bank}
            onClick={() => setSelected(d.bank)}
            className={`text-left bg-background p-6 lg:p-8 transition-colors ${
              selected === d.bank ? "bg-secondary" : "hover:bg-secondary/60"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-2">
                  <CreditCard className="h-3 w-3" /> Bank
                </p>
                <p className="font-serif text-xl">{d.bank}</p>
              </div>
              <span className="font-serif text-2xl text-matcha-foreground">{d.discount}</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {d.days}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
