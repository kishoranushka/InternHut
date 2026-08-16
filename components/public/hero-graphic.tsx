"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Users } from "lucide-react";

export function HeroGraphic() {
  return (
    <div className="relative hidden aspect-square w-full max-w-md items-center justify-center lg:flex">
      {/* rotating dashed ring */}
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-dashed border-accent/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* ambient glow */}
      <div className="absolute h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />

      {/* central gradient disc */}
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-accent shadow-accent-lg">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40" />
          ))}
        </div>
      </div>

      {/* floating card: certificate verified */}
      <motion.div
        className="absolute left-0 top-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent text-white">
          <BadgeCheck className="h-4 w-4" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold text-foreground">Certificate verified</p>
          <p className="font-mono text-[10px] text-muted-foreground">CERT-7K9M2-QX4RT</p>
        </div>
      </motion.div>

      {/* floating card: student count */}
      <motion.div
        className="absolute bottom-8 right-0 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Users className="h-4 w-4" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold text-foreground">1,200+ students</p>
          <p className="text-[10px] text-muted-foreground">enrolled this year</p>
        </div>
      </motion.div>

      {/* corner accent block */}
      <div className="absolute -bottom-2 -left-2 h-10 w-10 rounded-lg bg-accent shadow-accent" />
    </div>
  );
}
