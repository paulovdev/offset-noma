"use client";

import {
  motion,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function ProjectCard({
  project,
  index = 0,
  scrollVelocity,
  onComplete,
  isActive,
  setIsHoveringActive,
  cursor,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!pathname.includes("/project")) {
      setIsClicked(false);
    }
  }, [pathname]);

  const rawX = useTransform(scrollVelocity, [-1, 0, 1], [-70, 0, 70]);

  const x = useSpring(rawX, {
    stiffness: 65 - (index % 4) * 5,
    damping: 20,
    mass: 1.1 + (index % 4) * 0.1,
  });

  const handleClick = () => {
    if (!isActive || isClicked) return;

    setIsClicked(true);

    setTimeout(() => {
      router.push(`/project/${project.id}`);
    }, 600);
  };

  const isProjectRoute = pathname.includes("/project") || isClicked;

  return (
    <div className="relative size-full">
      <motion.button
        onClick={handleClick}
        onPointerEnter={() => {
          if (isActive && setIsHoveringActive) setIsHoveringActive(true);
        }}
        onPointerLeave={() => {
          if (setIsHoveringActive) setIsHoveringActive(false);
        }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{
          clipPath: onComplete ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
          filter: isActive ? "brightness(100%)" : "brightness(75%)",
        }}
        transition={{
          clipPath: {
            delay: onComplete ? 0 : index * 0.05,
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          },
          filter: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
        }}
        className="group relative block h-full w-[30vw] shrink-0 cursor-pointer overflow-hidden max-lg:w-[75vw] transform-3d"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{
            clipPath: isClicked ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-0 z-30 pointer-events-none bg-ts"
        />

        <motion.div
          style={{ x }}
          className="absolute -top-[5%] -left-[20%] h-[110%] w-[140%] pointer-events-none will-change-transform"
        >
          <Image
            src={project.img}
            alt={project.name}
            width={3200}
            height={3600}
            priority={index < 4}
            placeholder="blur"
            className="size-full object-cover"
          />
        </motion.div>
      </motion.button>

      {/* Nome do Projeto renderizado diretamente dentro do Card */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={project.id}
            className="absolute size-full inset-0 flex items-center justify-center z-20 pointer-events-none overflow-y-hidden"
            style={{ x: cursor }}
          >
            <div className="overflow-hidden h-fit">
              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={{
                  y: isProjectRoute ? -25 : 0,
                  opacity: isProjectRoute ? 0 : 1,
                }}
                exit={{
                  y: -25,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.76, 0, 0.24, 1],

                  delay: onComplete ? 3 : 0,
                }}
                className="text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p"
              >
                {project.name}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
