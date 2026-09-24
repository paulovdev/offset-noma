"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { PiAsterisk } from "react-icons/pi";

export function Navbar({ onComplete, inputY, logoY, logoRotate }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed left-1/2 top-5 z-60 w-full -translate-x-1/2 pointer-events-auto px-6">
      {/* Container em Grid com 3 colunas iguais para garantir o centro perfeito */}
      <div className="grid grid-cols-3 items-center w-full max-w-65 mx-auto">
        {/* SOBRE (Alinhado à esquerda) */}
        <div className="flex justify-start ml-4">
          <div className="w-24 overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: onComplete ? "100%" : "0%" }}
              transition={{
                duration: 0.9,
                delay: onComplete ? 0 : 1.8,
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
                    className={`text-left text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      pathname === "/about"
                        ? "-translate-y-full"
                        : "group-hover:-translate-y-full"
                    }`}
                  >
                    about
                  </p>
                  <p
                    className={`absolute left-0 top-full text-left text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      pathname === "/about"
                        ? "-translate-y-full"
                        : "group-hover:-translate-y-full"
                    }`}
                  >
                    about
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* LOGO ASTERISK (Centralizado no meio exato) */}
        <div className="flex justify-center">
          <div className="overflow-hidden flex items-center justify-center">
            <motion.div
              initial={{ y: "150%", scale: 0.5, rotate: -150 }}
              animate={{
                y: onComplete ? "150%" : "0%",
                scale: onComplete ? 0.5 : 1,
                rotate: onComplete ? -150 : 0,
              }}
              transition={{
                duration: 0.9,
                delay: onComplete ? 0.25 : 1.85,
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
        </div>

        {/* CONTATO (Alinhado à direita) */}
        <div className="flex justify-end ">
          <div className="w-24 overflow-hidden flex justify-end">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: onComplete ? "100%" : "0%" }}
              transition={{
                duration: 0.9,
                delay: onComplete ? 0.5 : 2.1,
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
                    className={`text-right text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      pathname === "/contact"
                        ? "-translate-y-full"
                        : "group-hover:-translate-y-full"
                    }`}
                  >
                    contact
                  </p>
                  <p
                    className={`absolute left-0 top-full text-right text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      pathname === "/contact"
                        ? "-translate-y-full"
                        : "group-hover:-translate-y-full"
                    }`}
                  >
                    contact
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
