import type {Metadata} from "next";

import "../globals.css";

import {Toaster} from "sonner";

import Provider from "@/components/dashboard/provider";
import {supabaseServer} from "@/lib/supabase/server";
import {UserDetails} from "@/db/types";

export const metadata: Metadata = {
  title: "PaisaBank",
  description: "Your All-in-One Digital Banking Platform",
  generator: "Next.js",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "fveiras",
      url: "https://www.x.com/fveiras_",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    {rel: "apple-touch-icon", url: "/logo.svg"},
    {rel: "icon", url: "/logo.svg"},
  ],
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const {data: userData} = (await supabase
    .from("user_details")
    .select()
    .eq("user_id", user?.id)
    .single()) as unknown as {data: UserDetails};

  return (
    <html lang="en">
      <Provider user={user} user_details={userData}>
        <body className="flex h-screen overflow-hidden">
          <div className="flex-1 px-4 pt-4 font-sans">
            <main className="bg-background m-auto h-full w-full rounded-t-2xl">{children}</main>
            <Toaster />
          </div>
        </body>
      </Provider>
    </html>
  );
}
