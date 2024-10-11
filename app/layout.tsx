import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import PageHeader from "@/components/PageHeader";
import Head from "next/head";
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <Script src="https://feedwave-widget.vercel.app/widget.umd.js"></Script>
        </Head>
        <body>
          <Script src="https://feedwave-widget.vercel.app/widget.umd.js"></Script>
          <PageHeader />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
