"use client";

import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { fmt } from "@/lib/store-data";
import { useWishlist, useCart } from "@/lib/store-context";

export function ProductCard({ p, ribbon }) {
  const discount = p.original
    ? Math.round(((p.original - p.price) / p.original) * 100)
    : 0;

  const wishlist = useWishlist();
  const cart = useCart();

  const wished = wishlist.has(p.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-(--shadow-soft) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-elegant)">
      <Link
        href={`/products/${p.id}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={p.img?.src ?? p.img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-gold-foreground">
            -{discount}%
          </span>
        )}

        {ribbon && (
          <span className="absolute left-0 top-6 rounded-r-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {ribbon}
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          wishlist.toggle(p.id);
        }}
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-opacity duration-300 ${
          wished ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <Heart
          className={`h-4 w-4 ${
            wished ? "fill-red-500 text-red-500" : "text-gray-700"
          }`}
        />
      </button>

      {/* Quick Add */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          cart.add(p.id);
        }}
        className="absolute inset-x-3 bottom-31 translate-y-4 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Quick Add
        </span>
      </button>

      <Link
        href={`/products/${p.id}`}
        className="flex flex-1 flex-col gap-1.5 p-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {p.brand}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold">{p.name}</h3>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">
            {p.rating.toFixed(1)}
          </span>
          <span>({p.reviews})</span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-accent">
            {fmt(p.price)}
          </span>

          {p.original && (
            <span className="text-xs line-through text-muted-foreground">
              {fmt(p.original)}
            </span>
          )}
        </div>

        {p.lowStock && (
          <p className="text-[11px] font-semibold text-red-500">
            Only {p.lowStock} left!
          </p>
        )}
      </Link>
    </div>
  );
}
