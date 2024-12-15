"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-hightlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl  gap-10 md:text-5xl lg:text-6xl font-bold text-neutral-700 dark:text-white max-w-[70%] leading-relaxed lg:leading-snug text-center mx-auto "
      >
       Skyrocket your math grades in {" "}
        <Highlight className="text-black dark:text-white ">
          weeks, not months
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
