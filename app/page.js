import Image from "next/image";
import Link from "next/link";
import {
  Flame, Truck, ShieldCheck, Headphones, RotateCcw,
  Smartphone, Shirt, Sparkles, Apple, Home as HomeIcon,
  Gem, ArrowRight, Play, MapPin, Star,
} from "lucide-react";
import pFashion from "@/assets/p-fashion.jpg";
import appMockup from "@/assets/app-mockup.jpg";
import { ProductCard } from "@/components/store/ProductCard";
import { Hero } from "@/components/store/Hero";
import { Countdown } from "@/components/store/Countdown";
import { Newsletter } from "@/components/store/Newsletter";
import { BRANDS, CATEGORY_LIST, COUNTRIES, PRODUCTS } from "@/lib/store-data";

const CATEGORY_ICONS = {
  electronics: Smartphone,
  fashion: Shirt,
  beauty: Sparkles,
  groceries: Apple,
  "home-living": HomeIcon,
  accessories: Gem,
};

const TESTIMONIALS = [
  { name: "Amara O.", country: "🇳🇬 Lagos", quote: "Fastest delivery I've had — and the packaging felt premium. This is my new go-to.", rating: 5 },
  { name: "Layla H.", country: "🇦🇪 Dubai", quote: "Finally a marketplace that understands the region. Prices and selection are unmatched.", rating: 5 },
  { name: "Kofi M.", country: "🇰🇪 Nairobi", quote: "Bought a phone during flash sale, saved 30%, arrived in 48 hours. Trust earned.", rating: 5 },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustTicker />
      <Categories />
      <FlashSales />
      <Featured />
      <ShopByCountry />
      <BestSellers />
      <NewArrivals />
      <WhyChoose />
      <Brands />
      <Testimonials />
      <AppPromo />
      <Newsletter />
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, viewAll }) {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </div>
      {viewAll && (
        <Link href={viewAll} className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
          View all →
        </Link>
      )}
    </div>
  );
}

function TrustTicker() {
  const items = ["10,000+ sellers", "5M+ products", "Delivery to 7 countries", "Secure payments", "Mobile money supported", "14-day easy returns", "24/7 customer support"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-card/50">
      <div className="no-scrollbar overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 py-4 pr-12">
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="whitespace-nowrap font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <SectionHeader eyebrow="Browse" title="Shop by Category" subtitle="Curated selections across the things you love." viewAll="/categories" />
      <div className="no-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-4">
        {CATEGORY_LIST.map((c) => {
          const Icon = CATEGORY_ICONS[c.slug] ?? Gem;
          return (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group relative flex w-44 shrink-0 flex-col items-center gap-4 overflow-hidden rounded-3xl border border-border bg-card p-6 text-center shadow-(--shadow-soft) transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-(--shadow-elegant) md:w-auto"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-primary-foreground transition group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">{c.count} items</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FlashSales() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gold/95 via-gold to-accent/90">
      <div className="absolute inset-0 kente-pattern opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              <Flame className="h-3.5 w-3.5 text-accent" /> Flash Sale · Live
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-gold-foreground sm:text-5xl">Deals end in</h2>
          </div>
          <Countdown />
        </div>
        <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="w-64 shrink-0 lg:w-auto">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/deals" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary">
            View all deals <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <SectionHeader eyebrow="Hand-picked" title="Featured this week" subtitle="Editor's selection across categories." viewAll="/products" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Link href="/categories/fashion" className="group relative col-span-1 overflow-hidden rounded-3xl bg-card shadow-(--shadow-soft) lg:col-span-2 lg:row-span-2">
          <div className="aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:h-full">
            <Image src={pFashion} alt="Royal Ankara Collection" fill className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-primary-foreground">
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase text-gold-foreground">Editor&apos;s pick</span>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">Royal Ankara Collection</h3>
            <p className="mt-2 max-w-lg text-sm text-primary-foreground/85">Bold prints, handcrafted heritage. From $59.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition group-hover:bg-gold group-hover:text-gold-foreground">
              Shop collection <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
        <ProductCard p={PRODUCTS[1]} />
        <ProductCard p={PRODUCTS[3]} />
      </div>
    </section>
  );
}

function ShopByCountry() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-gold/10" />
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeader eyebrow="Local pride" title="Shop by Country" subtitle="Discover sellers and storefronts in your region." viewAll="/regions" />
        <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {COUNTRIES.map((c) => (
            <Link key={c.code} href="/regions" className="group relative flex w-40 shrink-0 flex-col items-center gap-3 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-(--shadow-elegant) md:w-auto">
              <span className="text-5xl transition group-hover:scale-110">{c.flag}</span>
              <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
              <p className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <MapPin className="h-3 w-3" /> Storefront
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <SectionHeader eyebrow="Loved by thousands" title="Best Sellers" subtitle="The products our community can't get enough of." viewAll="/best-sellers" />
      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} ribbon="Best Seller" />)}
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeader eyebrow="Just landed" title="New Arrivals" subtitle="Fresh from our trusted sellers." viewAll="/new-arrivals" />
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.slice(2, 6).map((p) => <ProductCard key={p.id} p={p} ribbon="New" />)}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: ShieldCheck, t: "Secure Payments", d: "Cards, mobile money, and cash on delivery — all protected." },
    { icon: Truck, t: "Fast Delivery", d: "48-hour delivery in major cities across 7 countries." },
    { icon: Star, t: "Trusted Sellers", d: "Every seller is verified, rated, and reviewed by you." },
    { icon: Headphones, t: "24/7 Support", d: "Real humans, ready in English and Arabic, around the clock." },
    { icon: RotateCcw, t: "Easy Returns", d: "Changed your mind? Return within 14 days, no questions asked." },
    { icon: Sparkles, t: "Member Rewards", d: "Earn points on every order. Redeem for discounts and gifts." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <SectionHeader eyebrow="The Merkato promise" title="Why shoppers choose us" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-(--shadow-elegant)">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-foreground">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Loved by world-class brands</p>
        <div className="no-scrollbar mt-8 flex items-center justify-start gap-12 overflow-x-auto md:justify-center">
          {BRANDS.map((b) => (
            <Link key={b.slug} href="/brands" className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-muted-foreground/60 grayscale transition hover:text-foreground hover:grayscale-0 sm:text-2xl">
              {b.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/8 via-background to-gold/10" />
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <SectionHeader eyebrow="Real stories" title="Loved across the region" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-3xl p-7 shadow-(--shadow-soft)">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gradient-primary font-display text-sm font-bold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppPromo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] gradient-primary p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
        <div className="absolute inset-0 kente-pattern opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="relative text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <Smartphone className="h-3.5 w-3.5 text-gold" /> Merkato Mobile
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Shop smarter from your pocket.</h2>
          <p className="mt-4 max-w-md text-primary-foreground/85">Get app-only deals, faster checkout, mobile money, and real-time order tracking.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-primary-foreground transition hover:bg-ink/80">
              <Apple className="h-7 w-7" />
              <span className="text-left">
                <span className="block text-[10px] uppercase opacity-70">Download on</span>
                <span className="block text-base font-semibold leading-tight">App Store</span>
              </span>
            </a>
            <a href="#" className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-primary-foreground transition hover:bg-ink/80">
              <Play className="h-7 w-7" />
              <span className="text-left">
                <span className="block text-[10px] uppercase opacity-70">Get it on</span>
                <span className="block text-base font-semibold leading-tight">Google Play</span>
              </span>
            </a>
          </div>
        </div>
        <div className="relative">
          <Image src={appMockup} alt="Merkato Store mobile app" width={500} height={600} className="mx-auto w-full max-w-md rounded-[2rem] shadow-(--shadow-elegant)" />
        </div>
      </div>
    </section>
  );
}


