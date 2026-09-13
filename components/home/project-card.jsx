"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProjectCard({
  project,
  index = 0,
  scrollVelocity = 0,
  loading,
}) {
  const router = useRouter();

  const spring = useSpring(scrollVelocity, {
    stiffness: 225,
    damping: 18,
    mass: 0.75,
  });

  const x = useTransform(spring, [-1, 0, 1], [-50, 0, 50]);

  return (
    <motion.button
      onClick={() => router.push(`/project/${project.id}`)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{
        clipPath: loading ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
      }}
      transition={{
        clipPath: {
          delay: loading ? 0 : 0.15 + index * 0.025,
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      whileTap={{ scale: 1.05 }}
      whileHover={{ scale: 0.99 }}
      className="group relative block h-full w-[30vw] shrink-0 cursor-pointer overflow-hidden max-lg:w-[75vw]"
    >
      <motion.div style={{ x }} className="relative size-full">
        <Image
          src={project.img}
          alt={project.name}
          width={3000}
          height={3000}
          placeholder="blur"
          className="size-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
        />

        {/*    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="overflow-hidden">
            <span className="block translate-y-[120%] text-[14px] font-medium uppercase tracking-[-3%] text-p transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
              view project
            </span>
          </div>
        </div> */}
      </motion.div>
    </motion.button>
  );
}
