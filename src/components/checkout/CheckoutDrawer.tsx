import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCheckout } from "./CheckoutProvider";
import { Banknote, CheckCircle2, CreditCard, Minus, Plus, Smartphone, Trash2, X } from "lucide-react";

type PaymentMethod = "cod" | "card" | "wallet";

const fmt = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export function CheckoutDrawer() {
  const { open, closeCheckout, items, updateQty, removeItem, subtotal, clear } = useCheckout();
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const deliveryFee = items.length ? 199 : 0;
  const total = subtotal + deliveryFee;
  const canPlace = form.name.trim() && form.phone.trim() && form.address.trim() && items.length > 0;

  useEffect(() => {
    if (open) setStep("checkout");
  }, [open]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPlace) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
    }, 900);
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => {
      if (step === "success") {
        clear();
        setForm({ name: "", phone: "", address: "" });
      }
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : handleClose())}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-l border-border bg-background flex flex-col [&>button]:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {step === "success" ? "Confirmation" : "Your Order"}
            </p>
            <h2 className="font-serif text-2xl mt-1">
              {step === "success" ? "Order Confirmed" : "Checkout"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "checkout" ? (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 animate-fade-in">
              {/* Items */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Order Summary
                </p>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border">
                    Your cart is empty. Add something from the menu.
                  </p>
                ) : (
                  <ul className="divide-y divide-border border-y border-border">
                    {items.map((it) => (
                      <li key={it.id} className="py-4 flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-lg leading-tight truncate">{it.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{fmt(it.price)}</p>
                        </div>
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.qty - 1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm">{it.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.qty + 1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>{fmt(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border font-serif text-xl">
                    <span>Total</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>
              </section>

              {/* Customer details */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Delivery Details
                </p>
                <div className="space-y-3">
                  <FloatingInput
                    label="Full Name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  />
                  <FloatingInput
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  />
                  <FloatingInput
                    label="Delivery Address"
                    textarea
                    value={form.address}
                    onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                  />
                </div>
              </section>

              {/* Payment method */}
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Payment Method
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <PaymentOption
                    icon={<Banknote className="h-4 w-4" />}
                    label="Cash on Delivery"
                    desc="Pay when your order arrives"
                    active={method === "cod"}
                    onClick={() => setMethod("cod")}
                  />
                  <PaymentOption
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Credit / Debit Card"
                    desc="Visa, Mastercard accepted"
                    active={method === "card"}
                    onClick={() => setMethod("card")}
                  />
                  <PaymentOption
                    icon={<Smartphone className="h-4 w-4" />}
                    label="Digital Wallet"
                    desc="EasyPaisa · JazzCash"
                    active={method === "wallet"}
                    onClick={() => setMethod("wallet")}
                  />
                </div>
              </section>
            </div>

            {/* Sticky footer */}
            <div className="border-t border-border px-6 py-5 bg-background">
              <button
                type="submit"
                disabled={!canPlace || submitting}
                className="w-full bg-foreground text-primary-foreground py-4 text-xs uppercase tracking-[0.3em] hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {submitting ? "Placing Order…" : `Place Order · ${fmt(total)}`}
              </button>
            </div>
          </form>
        ) : (
          <SuccessScreen onClose={handleClose} />
        )}
      </SheetContent>
    </Sheet>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "peer w-full bg-transparent border border-border px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder-transparent";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          required
          rows={2}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base + " resize-none"}
        />
      ) : (
        <input
          required
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
      <label className="absolute left-4 top-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground pointer-events-none">
        {label}
      </label>
    </div>
  );
}

function PaymentOption({
  icon,
  label,
  desc,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3.5 border text-left transition-all ${
        active
          ? "border-foreground bg-foreground text-primary-foreground"
          : "border-border hover:border-foreground/50 bg-background"
      }`}
    >
      <span
        className={`h-9 w-9 flex items-center justify-center border ${
          active ? "border-primary-foreground/40" : "border-border"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className={`block text-[11px] mt-0.5 ${active ? "opacity-70" : "text-muted-foreground"}`}>
          {desc}
        </span>
      </span>
      <span
        className={`h-4 w-4 rounded-full border-2 ${
          active ? "border-primary-foreground bg-primary-foreground" : "border-border"
        }`}
      />
    </button>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center animate-fade-up">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-matcha/40 blur-2xl" />
        <div className="relative h-20 w-20 rounded-full bg-matcha flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-matcha-foreground" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="mt-8 font-serif text-3xl leading-tight">Order Confirmed!</h3>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
        Your premium brew is on its way.
      </p>
      <div className="mt-8 px-5 py-3 border border-border">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Track Order</p>
        <p className="mt-1 font-serif text-xl">#BF-4921</p>
      </div>
      <button
        onClick={onClose}
        className="mt-10 w-full max-w-xs bg-foreground text-primary-foreground py-4 text-xs uppercase tracking-[0.3em] hover:bg-foreground/90 transition-colors"
      >
        Continue Browsing
      </button>
    </div>
  );
}
