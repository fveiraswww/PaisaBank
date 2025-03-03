"use client";

import {motion} from "framer-motion";
import {ArrowUpRight, Flag} from "lucide-react";
import Link from "next/link";

import {CreditCard} from "./credit-card";

import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

export default function HeroGeometric() {
  const fadeUpVariants = {
    hidden: {opacity: 0, y: 30},
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <CreditCard
        cardType="default"
        className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        delay={0.3}
        rotate={12}
      />

      <CreditCard
        cardType="gold"
        className="top-[60%] right-[0%] hidden md:top-[75%] md:right-[0%] md:block"
        delay={0.5}
        rotate={-15}
      />

      <CreditCard
        cardType="platinum"
        className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        delay={0.4}
        rotate={-8}
      />

      <CreditCard
        cardType="black"
        className="top-[60%] right-[0%] md:top-[15%] md:right-[20%]"
        delay={0.6}
        rotate={20}
      />

      <CreditCard
        cardType="blue"
        className="top-[5%] right-[0%] md:top-[10%] md:left-[25%]"
        delay={0.7}
        rotate={-25}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            animate="visible"
            className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 md:mb-12"
            custom={0}
            initial="hidden"
            variants={fadeUpVariants}
          >
            <Flag height={16} width={16} />
            <span className="text-sm tracking-wide text-white/60">PaisaBank beta</span>
            <Separator className="!h-4" orientation="vertical" />
            <Link href="/signIn">
              <span className="group flex cursor-pointer items-center gap-1.5 text-neutral-500">
                <span className="text-sm tracking-wide text-white/60">Access</span>
                <div className="rounded-full bg-neutral-100 dark:bg-neutral-900">
                  <ArrowUpRight
                    className="lucide lucide-arrow-up-right size-3.5 transition-transform duration-100 group-hover:translate-x-px group-hover:-translate-y-px"
                    height={18}
                    width={18}
                  />
                </div>
              </span>
            </Link>
          </motion.div>

          <motion.div animate="visible" custom={1} initial="hidden" variants={fadeUpVariants}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                PaisaBank
              </span>
              <br />
              <span
                className={cn(
                  "bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-transparent",
                )}
              >
                Your All-in-One Digital Banking Platform
              </span>
            </h1>
          </motion.div>

          <motion.div animate="visible" custom={2} initial="hidden" variants={fadeUpVariants}>
            <p className="mx-auto mb-8 max-w-xl px-4 text-base leading-relaxed font-light tracking-wide text-white/40 sm:text-lg md:text-xl">
              PaisaBank is a financial platform that simplifies the management of your cards and
              transactions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </div>
  );
}
