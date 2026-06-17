"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Globe, Send } from "lucide-react";
import { CATEGORY_LIST } from "@/lib/store-data";


function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const SOCIAL_ICONS = [IconFacebook, IconInstagram, IconTwitter, IconYoutube];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-5">

          {/* Brand + newsletter + socials */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
                <span className="font-display text-base font-extrabold text-primary-foreground">M</span>
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-none">Merkato Store</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                  Africa · Middle East
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm text-primary-foreground/70">
              The premium marketplace for shoppers across Africa and the Middle East. Built with love,
              designed for trust.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-sm gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="h-10 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-gold"
              />
              <button className="inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4 text-xs font-bold text-gold-foreground transition hover:bg-gold/90">
                <Send className="h-3.5 w-3.5" /> Join
              </button>
            </form>

            <div className="mt-5 flex gap-3">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-gold hover:text-gold"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <Col title="About Merkato" links={[
            { label: "Our Story",  href: "/about" },
            { label: "Careers",   href: "/about" },
            { label: "Brands",    href: "/brands" },
            { label: "Regions",   href: "/regions" },
          ]} />

          <Col title="Customer Service" links={[
            { label: "Help Center", href: "/help-center" },
            { label: "FAQ",         href: "/faq" },
            { label: "Shipping",    href: "/shipping" },
            { label: "Returns",     href: "/returns" },
            { label: "Contact Us",  href: "/contact" },
          ]} />

          <Col title="Shop" links={[
            { label: "All Products", href: "/products" },
            { label: "Flash Deals",  href: "/deals" },
            { label: "New Arrivals", href: "/new-arrivals" },
            { label: "Best Sellers", href: "/best-sellers" },
            ...CATEGORY_LIST.slice(0, 3).map((c) => ({
              label: c.name,
              href: `/categories/${c.slug}`,
            })),
          ]} />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {year} Merkato Store. All rights reserved.</p>
            <Link href="/privacy-policy" className="hover:text-gold">Privacy</Link>
            <Link href="/terms" className="hover:text-gold">Terms</Link>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 transition hover:bg-white/10">
              🇳🇬 Nigeria <ChevronDown className="h-3 w-3" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 transition hover:bg-white/10">
              <Globe className="h-3 w-3" /> English
            </button>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "PayPal", "M-Pesa"].map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold tracking-wider"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }) {
  return (
    <div>
      <p className="font-display text-sm font-bold uppercase tracking-wider text-primary-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
