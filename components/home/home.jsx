"use client";

import { ClipText } from "@/components/clip-text";
import { ProjectCard } from "./project-card";
import { useRouter, usePathname } from "next/navigation";
import { repeatedProjects } from "@/components/home/project-data";
import { useInfiniteColumns } from "@/components/home/use-infinite-columns";
import { useEffect, useState, useMemo, memo } from "react";
import { SiNike, SiAdidas, SiApple, SiSpotify, SiDior } from "react-icons/si";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Loader } from "../loader";
import { LuMouse } from "react-icons/lu";

const BRAND_ICONS = [SiNike, SiAdidas, SiApple, SiSpotify, SiDior];

const BrandList = memo(function BrandList({ loading, brandsY }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: loading ? 30 : 0,
        opacity: loading ? 0 : 1,
      }}
      transition={{
        duration: 0.8,
        delay: loading ? 0 : 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
      style={{ x: brandsY }}
      className="flex items-center gap-5 lg:gap-5 will-change-transform"
    >
      {BRAND_ICONS.map((Icon, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: loading ? "120%" : "0%" }}
            transition={{
              duration: 0.8,
              delay: loading ? 0 : 0.35 + i * 0.08,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <Icon className="pointer-events-auto cursor-pointer text-[34px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105" />
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
});

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const { x: mouseX, y: mouseY } = useMousePosition();

  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);

  const isModalActive = useMemo(
    () =>
      pathname.includes("/contact") ||
      pathname.includes("/about") ||
      pathname.includes("/project"),
    [pathname],
  );

  const { containerRef, projectsRef, scrollVelocity } = useInfiniteColumns(
    repeatedProjects.length,
    isModalActive,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoSpring = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  const textSpring = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  const brandsSpring = useSpring(scrollVelocity, {
    stiffness: 180,
    damping: 20,
    mass: 0.8,
  });

  const inputSpring = useSpring(scrollVelocity, {
    stiffness: 160,
    damping: 18,
    mass: 0.8,
  });

  const logoRotate = useTransform(logoSpring, [-1, 0, 1], [-50, 0, 50]);
  const logoY = useTransform(logoSpring, [-1, 0, 1], [5, 0, -5]);
  const textY = useTransform(textSpring, [-1, 0, 1], [30, 0, -30]);
  const brandsY = useTransform(brandsSpring, [-1, 0, 1], [20, 0, -20]);
  const inputY = useTransform(inputSpring, [-1, 0, 1], [5, 0, -5]);

  return (
    <>
      <Loader loading={loading} />

      <main
        ref={containerRef}
        className="relative h-svh w-full overflow-hidden bg-s select-none "
      >
        <div className="absolute inset-0 z-0 h-svh w-full overflow-hidden">
          <div
            ref={projectsRef}
            onMouseEnter={() => setIsDragging(true)}
            onMouseLeave={() => setIsDragging(false)}
            className="absolute left-0 top-0 flex h-svh w-max gap-2.5 transform-3d backface-hidden"
          >
            {repeatedProjects.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                index={index}
                scrollVelocity={scrollVelocity}
                loading={loading}
              />
            ))}
          </div>
        </div>
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className="pointer-events-none fixed z-999 flex size-30 -translate-x-1/2 -translate-y-1/2 
              items-center justify-center rounded-full bg-p/50 backdrop-blur-lg"
              style={{
                left: mouseX,
                top: mouseY,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.25,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <LuMouse className="text-[26px] text-p" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER — ABSOLUTE */}
        <div className="pointer-events-none absolute inset-0 z-30 flex h-svh w-full items-end justify-start p-2.5 select-none">
          {/* LOGO */}

          <div className="fixed left-1/2 top-5 z-60 -translate-x-1/2 overflow-hidden pointer-events-auto">
            <div className="flex items-center gap-10">
              <motion.div
                initial={{ y: "100%" }}
                animate={{
                  y: loading ? "100%" : "0%",
                }}
                transition={{
                  duration: 0.8,
                  delay: loading ? 0 : 0.75,
                  ease: [0.33, 1, 0.68, 1],
                }}
                onClick={() => router.push("/about")}
              >
                <motion.div
                  className="group relative w-fit cursor-pointer overflow-y-hidden"
                  style={{ x: inputY }}
                >
                  <div className="relative will-change-transform">
                    <p className="text-center text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      sobre
                    </p>

                    <p className="absolute left-0 top-full text-center text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      sobre
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  y: "120%",
                  scale: 0.5,
                  rotate: -150,
                }}
                animate={{
                  y: loading ? "120%" : "0%",
                  scale: loading ? 0.5 : 1,
                  rotate: loading ? -150 : 0,
                }}
                transition={{
                  duration: 1,
                  delay: loading ? 0 : 0.2,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                <motion.span
                  style={{
                    rotate: logoRotate,
                    x: logoY,
                  }}
                  className="block text-[38px] font-medium leading-none text-p will-change-transform"
                >
                  ✳
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ y: "100%" }}
                animate={{
                  y: loading ? "100%" : "0%",
                }}
                transition={{
                  duration: 0.8,
                  delay: loading ? 0 : 0.8,
                  ease: [0.33, 1, 0.68, 1],
                }}
                onClick={() => router.push("/contact")}
              >
                <motion.div
                  className="group relative w-fit cursor-pointer overflow-y-hidden"
                  style={{ x: inputY }}
                >
                  <div className="relative will-change-transform">
                    <p className="text-center text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      contato
                    </p>

                    <p className="absolute left-0 top-full text-center text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      contato
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* TEXT */}

          <div
            className="w-full p-5 w-full text-start
          max-lg:flex max-lg:items-center max-lg:justify-center max-lg:flex-col max-lg:text-center"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{
                y: loading ? 30 : 0,
                opacity: loading ? 0 : 1,
              }}
              transition={{
                duration: 0.8,
                delay: loading ? 0 : 0.15,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{ x: textY }}
              className="will-change-transform"
            >
              <ClipText
                text="Um estúdio de design independente que cria identidades, direção de arte e experiências visuais para marcas, produtos e espaços."
                animate={loading ? "exit" : "animate"}
                exit="exit"
                tag="p"
                className="max-w-150 max-lg:max-w-125 text-[clamp(22px,4vw,22px)] font-instrument font-normal leading-[90%] tracking-[-6%] text-p"
              />
            </motion.div>

            <div className="my-10 max-lg:my-6"></div>

            <BrandList loading={loading} brandsY={brandsY} />
          </div>
        </div>
      </main>
    </>
  );
}
