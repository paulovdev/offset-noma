"use client";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export function CustomCursor({ x, y }) {
  return (
    <motion.div
      key="custom-cursor"
      className="pointer-events-none fixed z-90 size-32 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-ts"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center"
      >
        <IoClose className="text-[32px] text-p" />
      </motion.div>
    </motion.div>
  );
}
