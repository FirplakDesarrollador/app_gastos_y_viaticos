import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Gastos | Firplak",
  description: "Gestión de gastos y viáticos Firplak",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="es">
      <body className={inter.className}>
        {session ? (
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
