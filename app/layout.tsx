import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "./components";
import { CartProvider } from "@/providers";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/nav/NavBar";

const poppins = Poppins({ subsets: ["latin"], weight:['400', '700'] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <CartProvider>
          <Toaster toastOptions={{
            style: {
              background: 'rgb(51 65 85)',
              color: "#fff",
            }
          }}/>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
