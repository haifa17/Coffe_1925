"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function SplashScreenStatic() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="relative">
        {/* Animated circles */}
        <motion.div
          className="absolute inset-0 -m-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-primary/20 rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-primary/20 rounded-full" />
          <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 bg-primary/20 rounded-full" />
          <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 bg-primary/20 rounded-full" />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 relative">
            <Image
              src="/images/logo.png"
              alt="The 1925"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Loading menu...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}