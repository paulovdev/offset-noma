"use client";

import { ClipText } from "@/components/clip-text";
import { Loader } from "@/components/loader";
import { ProjectCard } from "./project-card";
import { useRouter, usePathname } from "next/navigation";
import {
  repeatedLeftProjects,
  repeatedRightProjects,
} from "@/components/home/project-data";
import { useInfiniteColumns } from "@/components/home/use-infinite-columns";
import { useEffect, useState, useMemo, memo } from "react";
import { SiNike, SiAdidas, SiApple, SiSpotify, SiDior } from "react-icons/si";
import { motion, useSpring, useTransform } from "framer-motion";

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
      style={{ y: brandsY }}
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
            <Icon
              className="pointer-events-auto cursor-pointer text-[32px] text-p 
              transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105"
            />
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

  const { containerRef, leftRef, rightRef, scrollVelocity } =
    useInfiniteColumns(6, 7, isModalActive);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  /* -------------------------------------------------------------
   * CONFIGURAÇÃO DOS SPRINGS (Intensidade Suave/Original)
   * ------------------------------------------------------------- */

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
  const logoY = useTransform(logoSpring, [-1, 0, 1], [8, 0, -8]);

  const textY = useTransform(textSpring, [-1, 0, 1], [12, 0, -12]);

  const brandsY = useTransform(brandsSpring, [-1, 0, 1], [14, 0, -14]);

  const inputY = useTransform(inputSpring, [-1, 0, 1], [5, 0, -5]);

  return (
    <>
      {/*      <Loader loading={loading} />
       */}
      <main
        ref={containerRef}
        className="relative flex h-svh w-full bg-s cursor-s-resize select-none max-lg:cursor-ew-resize max-lg:flex-col"
      >
        {/* LEFT PROJECTS - Absoluto na esquerda, z-10 para ficar atras do centro */}
        <div
          className="pointer-events-auto absolute left-2.5 inset-y-0 z-10 w-[30vw] select-none 
          max-lg:left-0 max-lg:inset-y-auto max-lg:top-0 max-lg:h-[35svh] max-lg:w-full"
        >
          <div
            ref={leftRef}
            className="absolute left-0 top-0 flex w-full flex-col gap-2.5 will-change-transform 
            max-lg:h-full max-lg:w-max max-lg:flex-row"
          >
            {repeatedLeftProjects.map((project, index) => (
              <ProjectCard
                key={`left-${project.id}-${index}`}
                project={project}
                index={index}
                scrollVelocity={scrollVelocity}
                loading={loading}
              />
            ))}
          </div>
        </div>

        {/* CENTER - z-30 para ficar por cima dos cards que transbordam */}
        <div
          className="pointer-events-none p-2.5 relative z-30 mx-auto flex h-svh w-[40vw] flex-col items-center justify-center select-none 
          max-lg:w-full max-lg:h-[35svh]"
        >
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
                  y: logoY,
                }}
                className="block text-[38px] font-medium leading-none text-p will-change-transform"
              >
                ✳
              </motion.span>
            </motion.div>
          </div>

          {/* TEXT */}
          <div className="mb-25 w-full max-w-175 text-center max-lg:max-w-100 max-lg:mb-5">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: loading ? 30 : 0, opacity: loading ? 0 : 1 }}
              transition={{
                duration: 0.8,
                delay: loading ? 0 : 0.15,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{ y: textY }}
              className="will-change-transform"
            >
              <ClipText
                text="An Independent ✦ Design Studio That Creates Identities, ◉ Art Direction And Visual Experiences ✧ For Brands, Products ■ And Spaces."
                animate={loading ? "exit" : "animate"}
                exit="exit"
                tag="p"
                className="text-[clamp(28px,4vw,34px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p max-2xl:text-[16px] max-md:text-[15px]"
              />
            </motion.div>
          </div>

          {/* BRANDS */}
          <BrandList loading={loading} brandsY={brandsY} />

          {/* ABOUT + CONTACT */}
          <div className="pointer-events-auto fixed bottom-5 left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-5 overflow-hidden max-lg:bottom-4 max-lg:gap-3">
            {/* ABOUT */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: loading ? "100%" : "0%" }}
              transition={{
                duration: 0.8,
                delay: loading ? 0 : 0.75,
                ease: [0.33, 1, 0.68, 1],
              }}
              onClick={() => router.push("/about")}
            >
              <motion.div
                className="group relative w-fit cursor-pointer overflow-hidden"
                style={{ y: inputY }}
              >
                <div className="relative will-change-transform">
                  <p
                    className="
            text-center text-[14px] font-normal uppercase
            leading-[100%] tracking-[10%] text-p
            transition-transform duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:-translate-y-full
             max-lg:mix-blend-difference
          "
                  >
                    about us
                  </p>

                  <p
                    className="
            absolute left-0 top-full text-center text-[14px] font-normal uppercase
            leading-[100%] tracking-[10%]
            text-p transition-transform duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:-translate-y-full
             max-lg:mix-blend-difference
          "
                  >
                    about us
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* DIVIDER */}
            <span className="h-3 w-px bg-p/30" />

            {/* CONTACT */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: loading ? "100%" : "0%" }}
              transition={{
                duration: 0.8,
                delay: loading ? 0 : 0.8,
                ease: [0.33, 1, 0.68, 1],
              }}
              onClick={() => router.push("/contact")}
            >
              <motion.div
                className="group relative w-fit cursor-pointer overflow-hidden"
                style={{ y: inputY }}
              >
                <div className="relative will-change-transform">
                  <p
                    className="
           text-center text-[14px] font-normal uppercase
            leading-[100%] tracking-[10%] text-p
            transition-transform duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:-translate-y-full
             max-lg:mix-blend-difference
          "
                  >
                    contact
                  </p>

                  <p
                    className="
            absolute left-0 top-full text-center text-[14px] font-normal uppercase
            leading-[100%] tracking-[10%] 
            text-p transition-transform duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:-translate-y-full
             max-lg:mix-blend-difference
          "
                  >
                    contact
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PROJECTS - Absoluto na direita, z-10 para ficar atras do centro */}
        <div
          className="pointer-events-auto absolute right-2.5 inset-y-0 z-10 w-[30vw] select-none 
          max-lg:right-0 max-lg:inset-y-auto max-lg:bottom-0 max-lg:h-[35svh] max-lg:w-full"
        >
          <div
            ref={rightRef}
            className="absolute left-0 top-0 flex w-full flex-col gap-2.5 will-change-transform max-lg:h-full max-lg:w-max max-lg:flex-row"
          >
            {repeatedRightProjects.map((project, index) => (
              <ProjectCard
                key={`right-${project.id}-${index}`}
                project={project}
                index={index}
                scrollVelocity={scrollVelocity}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
