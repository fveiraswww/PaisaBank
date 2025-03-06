"use client";
import React from "react";
import {motion} from "framer-motion";
import {Bell, LogOut} from "lucide-react";
import {useRouter} from "next/navigation";

import {createClient} from "@/lib/supabase/client";

export function Header() {
  const supabase = createClient();
  const route = useRouter();

  async function signOut() {
    await supabase.auth.signOut();

    route.push("/");
  }

  return (
    <header className="flex items-center justify-between p-4">
      <motion.button
        className="rounded-full bg-white p-2 shadow-sm dark:bg-gray-800"
        whileTap={{scale: 0.95}}
        onClick={() => signOut()}
      >
        <LogOut size={20} />
      </motion.button>
      <h1 className="text-xl font-bold">PaisaBank</h1>
      <motion.button
        className="relative rounded-full bg-white p-2 shadow-sm dark:bg-gray-800"
        whileTap={{scale: 0.95}}
      >
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
      </motion.button>
    </header>
  );
}
