"use client";

import { PageHeader } from "@/components/store/PageHeader";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCTS } from "@/lib/store-data";

export default function NewArrivalsPage() {
  const list = [...PRODUCTS].reverse();

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "New Arrivals" }]}
        eyebrow="Just landed"
        title="New Arrivals"
        subtitle="The latest pieces from our trusted sellers, refreshed weekly."
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} ribbon="New" />
          ))}
        </div>
      </div>
    </div>
  );
}
