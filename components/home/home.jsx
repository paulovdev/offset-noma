"use client";

import { ProjectCard } from "./project-card";
import { useRouter, usePathname } from "next/navigation";
import { repeatedProjects } from "@/components/home/project-data";
import { useInfiniteColumns } from "@/components/home/use-infinite-columns";
import { useState, useMemo } from "react";

import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Loader } from "../loader";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Navbar } from "../nav/nav";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const { x: mouseX, y: mouseY } = useMousePosition();
  const isMobile = useIsMobile(768);

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
            onPointerEnter={() => setIsDragging(true)}
            onPointerLeave={() => setIsDragging(false)}
            onPointerMove={() => {
              if (!isDragging && !isModalActive) {
                setIsDragging(true);
              }
            }}
            className="absolute flex h-[60vh] w-max transform-3d items-center gap-2.5"
          >
            {repeatedProjects.map((project, index) => {
              const realCount = repeatedProjects.length / 4;
              const isCardActive = index % realCount === activeIndex;

              return (
                <ProjectCard
                  key={`${project.id}-${index}`}
                  project={project}
                  index={index}
                  scrollVelocity={scrollVelocity}
                  onComplete={onComplete}
                  isActive={isCardActive}
                  setIsHoveringActive={setIsHoveringActive}
                  cursor={cursor}
                />
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
              className={`h-1.5 transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-ts" : "w-1.5 bg-p/30"
              }`}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {isDragging && !isMobile && (
            <motion.div
              key={`${isDragging}-${isModalActive}`}
              className="pointer-events-none fixed z-999 size-32 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-ts"
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
          <Navbar
            onComplete={onComplete}
            inputY={inputY}
            logoY={logoY}
            logoRotate={logoRotate}
          />
        </div>
      </main>
    </>
  );
}
