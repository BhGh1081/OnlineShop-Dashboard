import type { Metadata } from "next";
import Providers from "./providers/providers";
import '../globals.css';
import UserProvider from "@/context/userContext";
import { getUser } from "@/services/auth";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const currentUser = await getUser();

  return (

    <html lang="en">
      <body className={''}>
        <Providers>
          <UserProvider initialUser={currentUser}>
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
