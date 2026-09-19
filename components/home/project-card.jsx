"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProjectCard({
  project,
  index = 0,
  scrollVelocity,
  loading,
  isActive,
  setIsHoveringActive, // <--- Nova prop
}) {
  const router = useRouter();

  const x = useTransform(scrollVelocity, [-1, 0, 1], [-30, 0, 30]);

  return (
    <motion.button
      onClick={() => router.push(`/project/${project.id}`)}
      onMouseEnter={() => {
        if (isActive && setIsHoveringActive) setIsHoveringActive(true);
      }}
      onMouseLeave={() => {
        if (setIsHoveringActive) setIsHoveringActive(false);
      }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{
        clipPath: loading ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
        scale: isActive ? 1.02 : 0.92,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{
        clipPath: {
          delay: loading ? 0 : 0.05 + index * 0.035,
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
        scale: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative block h-full w-[30vw] shrink-0 cursor-pointer overflow-hidden 
      max-lg:w-[75vw] transform-3d"
    >
      <motion.div
        style={{ x }}
        className="relative size-full will-change-transform pointer-events-none "
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
