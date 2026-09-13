"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

export function Loader({ loading }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!loading) {
      animate(
        scope.current,
        { y: "-100%" },
        {
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      );
    }
  }, [loading, animate, scope]);

  return (
    <div
      ref={scope}
      className={`fixed inset-0 z-999 flex items-center justify-center bg-p ${loading ? "cursor-wait" : "pointer-events-none"}`}
    >
      <div className="flex items-center justify-center">
        <p className="text-[82px] font-normal uppercase leading-[100%] tracking-[10%] text-s will-change-transform animate-spin">
          ✳
        </p>
      </div>

      <style jsx>{`
        .dot {
          opacity: 0;
          animation: dot 1.2s infinite;
        }

        .dot-1 {
          animation-delay: 0s;
        }

        .dot-2 {
          animation-delay: 0.2s;
        }

        .dot-3 {
          animation-delay: 0.4s;
        }

        @keyframes dot {
          0%,
          60%,
          100% {
            opacity: 0;
          }

          30% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
