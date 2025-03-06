import type {Metadata} from "next";

import "../globals.css";
import "../../components/access/gradient.css";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";
import {Flag} from "lucide-react";
import {redirect} from "next/navigation";
import {Toaster} from "sonner";

import {supabaseServer} from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "PaisaBank",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const supabase = await supabaseServer();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (user?.id) {
    const {data} = await supabase.from("user_details").select().eq("user_id", user.id).single();

    if (data) {
      redirect(`/dashboard/${data?.username ?? ""}`);
    }
  }

  return (
    <html suppressHydrationWarning lang="en">
      <body className="m-auto grid h-[100dvh] grid-rows-[auto,1fr,auto] font-sans antialiased">
        <main>
          <Link className="absolute top-8 left-8 md:top-4 md:left-4" href="/">
            <div className="flex flex-row items-center gap-2">
              <Flag height={16} width={16} />
              <span className="text-sm font-bold tracking-wide">PaisaBank beta</span>
            </div>
          </Link>
          <div className="flex h-screen w-full flex-row overflow-hidden">
            {children}
            <div className="bg-gradient gradient relative hidden h-full flex-[1] flex-col justify-center overflow-hidden border-l p-8 md:col-span-2 md:flex">
              <canvas className="Gradient__canvas isLoaded relative h-full w-full" />
              <Spline
                className="canvas"
                scene="https://prod.spline.design/y9rcW5VFyz0Gvlwl/scene.splinecode"
              />
              <div
                className="absolute top-0 left-0 h-full w-full shadow-lg"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(60, 1fr)`,
                  gridTemplateRows: `repeat(60, 1fr)`,
                }}
              >
                {[...Array(60 * 60)].map((_, index) => (
                  <div key={index} className="border-[0.5px] border-gray-100/20" />
                ))}
              </div>
              <div className="bg-background absolute top-1/2 left-8 flex h-3/4 w-full -translate-y-1/2 transform items-end overflow-hidden rounded-2xl shadow-2xl">
                <Image fill alt="" src="/access-to-app.webp" style={{objectFit: "cover"}} />
              </div>
            </div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
