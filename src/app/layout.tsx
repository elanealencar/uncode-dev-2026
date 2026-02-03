import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/store/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Uncode Store | E-commerce",
  description: "E-commerce desenvolvido como desafio técnico para vaga de Frontend Jr",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <CartProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
