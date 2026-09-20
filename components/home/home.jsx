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
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiAsterisk } from "react-icons/pi";

const BRAND_ICONS = [SiNike, SiAdidas, SiApple, SiSpotify, SiDior];

const BrandList = memo(function BrandList({ onComplete, brandsY }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: onComplete ? 30 : 0,
        opacity: onComplete ? 0 : 1,
      }}
      transition={{
        duration: 0.8,
        delay: onComplete ? 0 : 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
      style={{ x: brandsY }}
      className="flex items-center gap-5 lg:gap-5 will-change-transform"
    >
      {BRAND_ICONS.map((Icon, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: onComplete ? "120%" : "0%" }}
            transition={{
              duration: 0.8,
              delay: onComplete ? 0 : 0.35 + i * 0.08,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <Icon className="pointer-events-auto cursor-pointer text-[30px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-105" />
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
  const [isHoveringActive, setIsHoveringActive] = useState(false);
  const [onComplete, setOnComplete] = useState(true);

  const isModalActive = useMemo(
    () =>
      pathname.includes("/contact") ||
      pathname.includes("/about") ||
      pathname.includes("/project"),
    [pathname],
  );

  const { containerRef, projectsRef, scrollVelocity, activeIndex } =
    useInfiniteColumns(repeatedProjects.length, isModalActive);

  const currentProject = repeatedProjects[activeIndex] || repeatedProjects[0];

  const logoSpring = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });
  const textSpring = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 51,
    mass: 0.6,
  });
  const brandsSpring = useSpring(scrollVelocity, {
    stiffness: 180,
    damping: 30,
    mass: 0.5,
  });
  const inputSpring = useSpring(scrollVelocity, {
    stiffness: 160,
    damping: 38,
    mass: 0.68,
  });
  const cursorSpring = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 40,
    mass: 0.45,
  });
  const dotsSpring = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 35,
    mass: 0.65,
  });

  const logoRotate = useTransform(logoSpring, [-1, 0, 1], [-50, 0, 50]);
  const logoY = useTransform(logoSpring, [-1, 0, 1], [5, 0, -5]);
  const textY = useTransform(textSpring, [-1, 0, 1], [30, 0, -30]);
  const brandsY = useTransform(brandsSpring, [-1, 0, 1], [20, 0, -20]);
  const inputY = useTransform(inputSpring, [-1, 0, 1], [5, 0, -5]);
  const cursor = useTransform(cursorSpring, [-1, 0, 1], [25, 0, -25]);
  const dotsX = useTransform(dotsSpring, [-1, 0, 1], [25, 0, -25]);

  return (
    <>
      <Loader setOnComplete={setOnComplete} />

      <main className="relative h-svh w-full bg-s select-none">
        <div
          className="absolute size-full flex items-center justify-center overflow-hidden z-0"
          ref={containerRef}
        >
          <div
            ref={projectsRef}
            onMouseEnter={() => setIsDragging(true)}
            onMouseLeave={() => setIsDragging(false)}
            className="absolute flex h-[60vh] w-max transform-3d items-center gap-2.5"
          >
            {repeatedProjects.map((project, index) => {
              const realCount = repeatedProjects.length / 4;

              const isCardActive = index % realCount === activeIndex;
              return (
                <div className="relative size-full">
                  <ProjectCard
                    key={`${project.id}-${index}`}
                    project={project}
                    index={index}
                    scrollVelocity={scrollVelocity}
                    onComplete={onComplete}
                    isActive={isCardActive}
                    setIsHoveringActive={setIsHoveringActive}
                  />
                  <AnimatePresence>
                    {isCardActive && (
                      <motion.div
                        className="absolute size-full inset-0 flex items-center justify-center z-20 pointer-events-none overflow-y-hidden"
                        style={{ x: cursor }}
                      >
                        <div className="overflow-hidden h-fit">
                          <motion.p
                            initial={{ y: 25 }}
                            animate={{
                              y: pathname.includes("/project") ? -25 : 0,
                            }}
                            exit={{ y: 25 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.76, 0, 0.24, 1],
                            }}
                            className="text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p"
                          >
                            {currentProject.name}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          style={{ x: dotsX }}
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none"
        >
          {Array.from({ length: repeatedProjects.length / 4 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5  transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-ts" : "w-1.5 bg-p/30"
              }`}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {isDragging && (
            <motion.div
              key={`${isDragging}-${isModalActive}`}
              className="pointer-events-none fixed z-999 size-32 -translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center rounded-full bg-ts"
              style={{
                left: mouseX,
                top: mouseY,
                rotate: cursor,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div
                key="drag-arrows"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center"
              >
                <MdKeyboardArrowLeft className="text-[26px] text-p" />
                <MdKeyboardArrowLeft className="text-[26px] text-p rotate-180" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-30 flex h-svh w-full items-end justify-start p-2.5 select-none">
          <div className="fixed left-1/2 top-5 z-60 -translate-x-1/2 pointer-events-auto">
            <div className="flex items-center gap-10">
              {/* SOBRE */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: onComplete ? "100%" : "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: onComplete ? 0 : 0.75,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  onClick={() => router.push("/about")}
                >
                  <motion.div
                    className="group relative w-fit cursor-pointer overflow-hidden"
                    style={{ x: inputY }}
                  >
                    <div className="relative will-change-transform">
                      <p
                        className={`text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                          pathname === "/about"
                            ? "-translate-y-full"
                            : "group-hover:-translate-y-full"
                        }`}
                      >
                        sobre
                      </p>
                      <p
                        className={`absolute left-0 top-full text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                          pathname === "/about"
                            ? "-translate-y-full"
                            : "group-hover:-translate-y-full"
                        }`}
                      >
                        sobre
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* LOGO ASTERISK */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "150%", scale: 0.5, rotate: -150 }}
                  animate={{
                    y: onComplete ? "150%" : "0%",
                    scale: onComplete ? 0.5 : 1,
                    rotate: onComplete ? -150 : 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: onComplete ? 0.25 : 0.2,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <motion.span
                    style={{ rotate: logoRotate, x: logoY }}
                    className={`block text-[38px] font-medium leading-none transition-colors duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
                      pathname === "/" ? "text-ts" : "text-p"
                    }`}
                  >
                    <PiAsterisk />
                  </motion.span>
                </motion.div>
              </div>

              {/* CONTATO */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: onComplete ? "100%" : "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: onComplete ? 0.5 : 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  onClick={() => router.push("/contact")}
                >
                  <motion.div
                    className="group relative w-fit cursor-pointer overflow-hidden"
                    style={{ x: inputY }}
                  >
                    <div className="relative will-change-transform">
                      <p
                        className={`text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                          pathname === "/contact"
                            ? "-translate-y-full"
                            : "group-hover:-translate-y-full"
                        }`}
                      >
                        contato
                      </p>
                      <p
                        className={`absolute left-0 top-full text-center text-[14px] font-medium uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                          pathname === "/contact"
                            ? "-translate-y-full"
                            : "group-hover:-translate-y-full"
                        }`}
                      >
                        contato
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/*   <div className="w-full p-5 text-start max-lg:flex max-lg:items-center max-lg:justify-center max-lg:flex-col max-lg:text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{
                y: onComplete ? 30 : 0,
                opacity: onComplete ? 0 : 1,
              }}
              transition={{
                duration: 0.8,
                delay: onComplete ? 0 : 0.15,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{ x: textY }}
              className="will-change-transform"
            >
              <ClipText
                text="Um estúdio de design independente que cria identidades, direção de arte e experiências visuais para marcas, produtos e espaços."
                animate={onComplete ? "exit" : "animate"}
                exit="exit"
                tag="p"
                className="max-w-130 max-lg:max-w-125 text-[clamp(18px,4vw,20px)] font-instrument font-normal leading-[90%] tracking-[-6%] text-p"
              />
            </motion.div>

            <div className="my-10 max-lg:my-6"></div>

            <BrandList onComplete={onComplete} brandsY={brandsY} />
          </div> */}
        </div>
      </main>
    </>
  );
}
