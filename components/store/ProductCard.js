"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { fmt } from "@/lib/store-data";

/**
 * ProductCard
 * Props:
 *   p        – product object from store-data
 *   ribbon   – optional string label ("Best Seller", "New", etc.)
 */
export function ProductCard({ p, ribbon }) {
  const discount = p.original
    ? Math.round(((p.original - p.price) / p.original) * 100)
    : null;

  return (
    <Link
      href={`/products/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={p.img}
          alt={p.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
            -{discount}%
          </span>
        )}
        {ribbon && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            {ribbon}
          </span>
        )}
        {p.lowStock && (
          <span className="absolute bottom-2 left-2 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
            Only {p.lowStock} left
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {p.brand}
        </p>
        <p className="line-clamp-2 text-sm font-semibold text-foreground">{p.name}</p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-bold text-foreground">{fmt(p.price)}</span>
          {p.original && (
            <span className="text-xs text-muted-foreground line-through">{fmt(p.original)}</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="font-medium text-foreground">{p.rating}</span>
          <span>({p.reviews.toLocaleString()})</span>
        </div>
      </div>
    </Link>
  );
}
