"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProjectCard({ project, index = 0, scrollVelocity, loading }) {
  const router = useRouter();

  const x = useTransform(scrollVelocity, [-1, 0, 1], [-25, 0, 25]);

  return (
    <motion.button
      onClick={() => router.push(`/project/${project.id}`)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{
        clipPath: loading ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
      }}
      transition={{
        clipPath: {
          delay: loading ? 0 : 0.05 + index * 0.015,
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative block h-full w-[40vw] shrink-0 cursor-pointer overflow-hidden max-lg:w-[75vw] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{ x }}
        className="relative size-full will-change-transform"
      >
        <Image
          src={project.img}
          alt={project.name}
          width={3200}
          height={3600}
          priority={index < 4}
          placeholder="blur"
          className="size-full object-cover brightness-50 transition-filter duration-500 group-hover:brightness-75"
        />
      </motion.div>
    </motion.button>
  );
}
