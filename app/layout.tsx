import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import SessionProvider  from "@/components/SessionProvider";
import { getServerSession } from 'next-auth';

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],

})
export const metadata: Metadata = {
  title: "Quizzly",
  description: "Personalised AI for your examination needs",
};  

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className = "flex items-center">
      <head>
        <link rel = "icon" href = "/favicon.ico"/>
      </head>
      <body
        className={poppins.className}

      >
        <SessionProvider session = {session}>
          <main>
        {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  );
}
