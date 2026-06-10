import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store-context";
import { SiteHeader } from "@/components/store/SiteHeader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Merkato Store",
  description: "Shop electronics, fashion, beauty and more across Africa and the Middle East.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
