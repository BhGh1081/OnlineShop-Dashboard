import type { Metadata } from "next";
import Providers from "./providers/providers";

import '../globals.css'


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  return (

    <html lang="en">
      <body className={''}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
