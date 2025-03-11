import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIA CPSR",
  description: "LIA CPSR - Raid Points Systeem",
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProtectedRoute>
            <ErrorBoundary error={null}>
              {children}
            </ErrorBoundary>
          </ProtectedRoute>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
