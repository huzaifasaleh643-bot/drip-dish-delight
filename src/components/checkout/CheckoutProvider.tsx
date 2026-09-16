import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Ctx = {
  open: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CheckoutCtx = createContext<Ctx | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<Ctx>(() => ({
    open,
    openCheckout: () => setOpen(true),
    closeCheckout: () => setOpen(false),
    items,
    addItem: (item) => setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    }),
    removeItem: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    updateQty: (id, qty) => setItems((prev) =>
      qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => p.id === id ? { ...p, qty } : p)
    ),
    clear: () => setItems([]),
    subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
  }), [open, items]);

  return <CheckoutCtx.Provider value={value}>{children}</CheckoutCtx.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutCtx);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
