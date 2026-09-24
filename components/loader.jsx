"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { PiAsterisk } from "react-icons/pi";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Loader({ setOnComplete }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimation = async () => {
      document.body.style.cursor = "wait";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      animate(
        ".loader-icon-inner",
        { rotate: 360 },
        {
          duration: 0.9,
          repeat: Infinity,
          ease: "linear",
        },
      );

      await wait(1000);

      await Promise.all([
        animate(
          ".loader-icon-inner",
          {
            y: "-100%",
          },
          {
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          },

          setOnComplete(false),
          await wait(1200),
          animate(
            ".loader-icon-wrapper",
            {
              top: "20px",
              y: "0%",
              scale: 0,
            },
            {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            },
          ),

          animate(
            ".loader-bg",
            { y: "-100%" },
            {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            },
          ),
        ),
      ]);

      document.body.style.cursor = "auto";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    runAnimation();
  }, [animate]);

  return (
    <div
      ref={scope}
      className="pointer-events-none fixed inset-0 z-[990] h-svh w-full select-none"
    >
      <div className="loader-bg absolute inset-0 bg-ts pointer-events-auto will-change-transform" />

      <div className="loader-icon-wrapper fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 overflow-hidden pointer-events-none will-change-transform">
        <div className="loader-icon-inner flex items-center justify-center text-[82px] text-p will-change-transform">
          <PiAsterisk className="" />
        </div>
      </div>
    </div>
  );
}
