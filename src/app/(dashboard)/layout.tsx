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
    {rel: "apple-touch-icon", url: "/icon.svg"},
    {rel: "icon", url: "/icon.svg"},
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
        <body className="flex h-[100dvh] overflow-hidden">
          <main className="mx-auto h-full w-full rounded-t-2xl md:w-10/12 xl:w-4/6">
            {children}
          </main>
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
