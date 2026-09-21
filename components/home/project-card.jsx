"use client";

import { motion, useTransform, useSpring } from "framer-motion";
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

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => {
        if (isActive && setIsHoveringActive) setIsHoveringActive(true);
      }}
      onMouseLeave={() => {
        if (setIsHoveringActive) setIsHoveringActive(false);
      }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{
        clipPath: onComplete ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
        filter: isActive ? "brightness(100%)" : "brightness(75%)",
      }}
      transition={{
        clipPath: {
          delay: onComplete ? 0 : 0.05 + index * 0.045,
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
  );
}
