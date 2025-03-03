import {motion} from "framer-motion";

import {cn} from "@/lib/utils";

export function CreditCard({
  className,
  delay = 0,
  rotate = 0,
  gradient = "from-white/[0.08]",
  cardType = "default",
}: {
  className?: string;
  delay?: number;
  rotate?: number;
  gradient?: string;
  cardType?: "default" | "gold" | "platinum" | "black" | "blue";
}) {
  const cardStyles = {
    default: "from-indigo-500/[0.15]",
    gold: "from-amber-500/[0.15] to-yellow-300/[0.1]",
    platinum: "from-slate-400/[0.15] to-slate-300/[0.1]",
    black: "from-zinc-800/[0.25] to-zinc-700/[0.15]",
    blue: "from-blue-500/[0.15] to-cyan-300/[0.1]",
  };

  const cardGradient = cardStyles[cardType] || gradient;

  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      className={cn("absolute", className)}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: {duration: 1.2},
      }}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        className="relative h-[161px] w-[255px] md:h-[215px] md:w-[340px]"
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-r to-transparent",
            cardGradient,
            "border border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
          )}
        >
          <div className="absolute top-8 left-8 h-9 w-12 rounded-md border border-white/20 bg-gradient-to-br from-yellow-200/60 to-yellow-400/60" />

          <div className="absolute top-24 right-8 left-8 flex justify-between">
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
          </div>

          <div className="absolute bottom-12 left-8">
            <div className="mb-2 h-1.5 w-24 rounded-full bg-white/20" />
            <div className="h-1.5 w-32 rounded-full bg-white/20" />
          </div>

          <div className="absolute right-8 bottom-12">
            <div className="mb-2 h-1.5 w-12 rounded-full bg-white/20" />
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
          </div>

          <div className="absolute right-8 bottom-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <div className="h-6 w-6 rounded-full bg-white/20" />
          </div>

          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />
        </div>
      </motion.div>
    </motion.div>
  );
}
