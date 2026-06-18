"use client"

import Link from "next/link";
import { Check, Truck, Package, MapPin, Download, RotateCcw } from "lucide-react";
import { fmt, MOCK_ORDERS, PRODUCTS } from "@/lib/store-data";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id) ?? { id, date: "2026-06-09", status: "Processing", total: 199.99, items: 1, tracking: "DLV-" + id };
  const items = PRODUCTS.slice(0, order.items || 1);
  const steps = ["Ordered", "Processing", "Shipped", "Out for delivery", "Delivered"];
  const currentStep = order.status === "Delivered" ? 4 : order.status === "In transit" ? 3 : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/account/orders" className="text-xs font-semibold text-muted-foreground hover:text-primary">← All orders</Link>
          <h2 className="mt-2 font-display text-2xl font-bold">Order {order.id}</h2>
          <p className="text-sm text-muted-foreground">Placed on {order.date} · Tracking #{order.tracking}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-secondary"><Download className="h-3.5 w-3.5" /> Invoice</button>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h3 className="font-display font-bold">Tracking</h3>
        <div className="mt-5 flex items-center justify-between gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold ${i <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < currentStep ? <Check className="h-4 w-4" /> : i === currentStep ? <Truck className="h-4 w-4" /> : i + 1}
              </div>
              <p className={`text-[10px] font-semibold ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Shipping to</p>
          <p className="mt-2 font-semibold">Amara Okafor</p>
          <p className="text-sm text-muted-foreground">12 Marina Boulevard, Lagos, Nigeria</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"><Package className="h-3.5 w-3.5" /> Payment</p>
          <p className="mt-2 font-semibold">Visa ending 4242</p>
          <p className="text-sm text-muted-foreground">Charged {fmt(order.total)}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h3 className="font-display font-bold">Items</h3>
        <div className="mt-4 divide-y divide-border">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3">
              <img src={p.img} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <Link href={`/products/${p.id}`} className="line-clamp-1 font-semibold hover:text-primary">{p.name}</Link>
                <p className="text-xs text-muted-foreground">{p.brand}</p>
              </div>
              <p className="font-bold">{fmt(p.price)}</p>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-secondary"><RotateCcw className="h-3 w-3" /> Return</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <p className="font-display font-bold">Total</p>
          <p className="font-display text-2xl font-extrabold text-accent">{fmt(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
