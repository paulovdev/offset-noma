"use client";

import { ClipText } from "@/components/clip-text";
import { ProjectCard } from "./project-card";
import { useRouter, usePathname } from "next/navigation";
import { repeatedProjects } from "@/components/home/project-data";
import { useInfiniteColumns } from "@/components/home/use-infinite-columns";
import { useEffect, useState, useMemo, memo } from "react";
import { SiNike, SiAdidas, SiApple, SiSpotify, SiDior } from "react-icons/si";
import { motion, useSpring, useTransform } from "framer-motion";
import { Loader } from "../loader";

const BRAND_ICONS = [SiNike, SiAdidas, SiApple, SiSpotify, SiDior];

const BrandList = memo(function BrandList({ loading, brandsY }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: loading ? 30 : 0, opacity: loading ? 0 : 1 }}
      transition={{
        duration: 0.8,
        delay: loading ? 0 : 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
      style={{ x: brandsY }}
      className="flex items-center gap-3 lg:gap-5 will-change-transform"
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
            <Icon className="pointer-events-auto cursor-pointer text-[32px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105" />
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
});

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const isModalActive = useMemo(
    () =>
      pathname.includes("/contact") ||
      pathname.includes("/about") ||
      pathname.includes("/project"),
    [pathname],
  );

  const [loading, setLoading] = useState(true);

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

  const logoRotate = useTransform(logoSpring, [-1, 0, 1], [-75, 0, 75]);
  const logoY = useTransform(logoSpring, [-1, 0, 1], [12, 0, -12]);
  const textY = useTransform(textSpring, [-1, 0, 1], [32, 0, -32]);
  const brandsY = useTransform(brandsSpring, [-1, 0, 1], [24, 0, -24]);
  const inputY = useTransform(inputSpring, [-1, 0, 1], [15, 0, -15]);

  return (
    <>
      <Loader loading={loading} />
      <main
        ref={containerRef}
        className="relative h-svh w-full overflow-hidden bg-s cursor-ew-resize select-none"
      >
        {/* IMAGENS — FULL SCREEN */}

        <div className="absolute inset-0 z-0 h-svh w-full overflow-hidden">
          <div
            ref={projectsRef}
            className="absolute left-0 top-0 flex h-svh w-max gap-2.5 will-change-transform"
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

        {/* CENTER — ABSOLUTE */}

        <div className="pointer-events-none absolute inset-0 z-30 flex h-svh w-full items-center justify-center p-2.5 select-none">
          {/* LOGO */}

          <div className="fixed left-1/2 top-5 z-40 -translate-x-1/2 overflow-hidden">
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
          </div>

          {/* TEXT */}

          <div className="mb-25 w-full max-w-175 text-center">
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
                text="Um estúdio de design independente ✦ que cria identidades, direção de arte e experiências visuais ✧ para marcas, produtos ■ e espaços."
                animate={loading ? "exit" : "animate"}
                exit="exit"
                tag="p"
                className="text-[clamp(24px,4vw,30px)] font-instrument font-normal leading-[90%] tracking-[-6%] text-p "
              />
            </motion.div>
          </div>

          {/* BRANDS */}

          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-32.5">
            <BrandList loading={loading} brandsY={brandsY} />
          </div>

          {/* ABOUT + CONTACT */}

          <div className="pointer-events-auto fixed bottom-5 left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-5 overflow-hidden">
            {/* ABOUT */}

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

            <span className="h-3 w-px bg-p/30" />

            {/* CONTACT */}

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
      </main>
    </>
  );
}
