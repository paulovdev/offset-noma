"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { PiAsterisk } from "react-icons/pi";

export function Navbar({ onComplete, inputY, logoY, logoRotate }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed left-1/2 top-5 z-60 w-full -translate-x-1/2 pointer-events-auto">
      <div className="w-full flex items-center justify-center gap-10">
        {/* SOBRE */}
        <div className="w-20 flex items-start justify-start overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: onComplete ? "100%" : "0%" }}
            transition={{
              duration: 0.9,
              delay: onComplete ? 0 : 0.75,
              ease: [0.76, 0, 0.24, 1],
            }}
            onClick={() => router.push("/about")}
          >
            <motion.div
              className="group relative w-fit cursor-pointer overflow-hidden"
              style={{ x: inputY }}
            >
              <div className="relative will-change-transform">
                <p
                  className={`text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    pathname === "/about"
                      ? "-translate-y-full"
                      : "group-hover:-translate-y-full"
                  }`}
                >
                  sobre
                </p>
                <p
                  className={`absolute left-0 top-full text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    pathname === "/about"
                      ? "-translate-y-full"
                      : "group-hover:-translate-y-full"
                  }`}
                >
                  sobre
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* LOGO ASTERISK */}
        <div className="w-15 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ y: "150%", scale: 0.5, rotate: -150 }}
            animate={{
              y: onComplete ? "150%" : "0%",
              scale: onComplete ? 0.5 : 1,
              rotate: onComplete ? -150 : 0,
            }}
            transition={{
              duration: 0.9,
              delay: onComplete ? 0.25 : 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.span
              style={{ rotate: logoRotate, x: logoY }}
              className={`block text-[38px] font-medium leading-none transition-colors duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
                pathname === "/" ? "text-ts" : "text-p"
              }`}
            >
              <PiAsterisk />
            </motion.span>
          </motion.div>
        </div>

        {/* CONTATO */}
        <div className="w-20 flex items-end justify-end overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: onComplete ? "100%" : "0%" }}
            transition={{
              duration: 0.9,
              delay: onComplete ? 0.5 : 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            onClick={() => router.push("/contact")}
          >
            <motion.div
              className="group relative w-fit cursor-pointer overflow-hidden"
              style={{ x: inputY }}
            >
              <div className="relative will-change-transform">
                <p
                  className={`text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    pathname === "/contact"
                      ? "-translate-y-full"
                      : "group-hover:-translate-y-full"
                  }`}
                >
                  contato
                </p>
                <p
                  className={`absolute left-0 top-full text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    pathname === "/contact"
                      ? "-translate-y-full"
                      : "group-hover:-translate-y-full"
                  }`}
                >
                  contato
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
