"use client";

import { ClipText } from "@/components/clip-text";
import { Loader } from "@/components/loader";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectModal } from "@/components/home/project-modal";
import {
  repeatedLeftProjects,
  repeatedRightProjects,
} from "@/components/home/project-data";
import { useInfiniteColumns } from "@/components/home/use-infinite-columns";
import { useEffect, useState } from "react";
import {
  SiNike,
  SiAdidas,
  SiPuma,
  SiApple,
  SiSpotify,
  SiDior,
} from "react-icons/si";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import ContactModal from "./contact-modal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contactModal, setContactModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const { containerRef, leftRef, rightRef, scrollVelocity } =
    useInfiniteColumns(5, 4, currentProject !== null);

  const logoSpring = useSpring(scrollVelocity, {
    stiffness: 320,
    damping: 22,
    mass: 0.6,
  });

  const textSpring = useSpring(scrollVelocity, {
    stiffness: 250,
    damping: 22,
    mass: 0.8,
  });

  const brandsSpring = useSpring(scrollVelocity, {
    stiffness: 210,
    damping: 20,
    mass: 1.25,
  });

  const inputSpring = useSpring(scrollVelocity, {
    stiffness: 155,
    damping: 15,
    mass: 1.5,
  });

  const logoRotate = useTransform(logoSpring, [-1, 0, 1], [-75, 0, 75]);
  const logoY = useTransform(logoSpring, [-1, 0, 1], [4, 0, -4]);
  const textY = useTransform(textSpring, [-1, 0, 1], [12, 0, -12]);
  const brandsY = useTransform(brandsSpring, [-1, 0, 1], [14, 0, -14]);
  const inputY = useTransform(inputSpring, [-1, 0, 1], [5, 0, -2]);

  const openProject = (project) => {
    setCurrentProject(project);
  };

  const closeProject = () => {
    setCurrentProject(null);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.inset = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <main
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden overscroll-none bg-s cursor-s-resize select-none touch-none max-lg:cursor-ew-resize"
      >
        {/* LEFT PROJECTS */}
        <div
          className="pointer-events-auto absolute left-2.5 top-0 h-screen w-[25vw] select-none overflow-hidden 
        max-lg:left-0 max-lg:top-2.5 max-lg:h-[27vh] max-lg:w-full"
        >
          <div
            ref={leftRef}
            className="absolute left-0 top-0 flex w-full flex-col gap-2.5 will-change-transform max-lg:h-full max-lg:w-max max-lg:flex-row"
          >
            {repeatedLeftProjects.map((project, index) => (
              <ProjectCard
                key={`left-${project.id}-${index}`}
                project={project}
                index={index}
                scrollVelocity={scrollVelocity}
                loading={loading}
                onClick={() => openProject(project)}
              />
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div
          className=" select-none pointer-events-none relative z-20 flex h-screen w-full 
          flex-col items-center justify-center max-lg:mix-blend-exclusion 
         max-lg:p-2.5"
        >
          {/* LOGO */}
          <div className="absolute left-1/2 top-5 z-30 -translate-x-1/2 overflow-hidden ">
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
                className="block text-[38px] font-normal leading-none text-p max-lg:text-s"
              >
                ✳
              </motion.span>
            </motion.div>
          </div>

          {/* TEXT */}
          <div className="mb-25 max-w-100 w-full text-center max-lg:max-w-75 max-lg:mb-10">
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
              style={{ y: textY }}
            >
              <ClipText
                text="Um estúdio de design independente que ajuda marcas a encontrar sua identidade, expressar suas ideias e se destacar."
                animate={loading ? "exit" : "animate"}
                exit="exit"
                tag="p"
                className="text-[16px] font-normal uppercase leading-[120%] tracking-[-4%] text-p max-lg:text-s max-lg:text-[14px]"
              />
            </motion.div>
          </div>

          {/* BRANDS */}
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
            className="flex items-center gap-5 "
          >
            {[SiNike, SiAdidas, SiPuma, SiApple, SiSpotify, SiDior].map(
              (Icon, i) => (
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
                      className="text-[32px] text-p max-lg:text-s 
                    hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                     cursor-pointer pointer-events-auto"
                    />
                  </motion.div>
                </div>
              ),
            )}
          </motion.div>

          {/* CONTACT */}
          <div className="pointer-events-auto absolute bottom-5 left-1/2 w-fit -translate-x-1/2 overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: loading ? "100%" : "0%" }}
              transition={{
                duration: 0.8,
                delay: loading ? 0 : 0.8,
                ease: [0.33, 1, 0.68, 1],
              }}
              onClick={() => setContactModal(true)}
            >
              <motion.div
                className="group relative w-fit cursor-pointer overflow-hidden"
                style={{ y: inputY }}
              >
                <div className="relative">
                  <p
                    className="text-[14px] font-normal text-center uppercase leading-[120%] tracking-[-4%] text-p max-lg:text-s 
                  transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full 
                  max-lg:mix-blend-difference max-lg:text-s"
                  >
                    contato
                  </p>
                  <p
                    className="absolute left-0 top-full text-[14px] font-normal text-center uppercase leading-[120%] tracking-[-4%] text-p max-lg:text-s 
                  transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full
                  max-lg:mix-blend-difference max-lg:text-s"
                  >
                    contato
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PROJECTS */}
        <div className="pointer-events-auto absolute right-2.5 top-0 h-screen w-[25vw] select-none overflow-hidden max-lg:bottom-2.5 max-lg:right-0 max-lg:top-auto max-lg:h-[27vh] max-lg:w-full">
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
                onClick={() => openProject(project)}
              />
            ))}
          </div>
        </div>

        {/* MODAL */}
        <ProjectModal
          currentProject={currentProject}
          closeProject={closeProject}
        />

        <AnimatePresence mode="wait">
          {contactModal && (
            <ContactModal
              isOpen={contactModal}
              onClose={() => setContactModal(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
