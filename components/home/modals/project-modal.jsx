"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";
import { ClipText } from "@/components/clip-text";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const menuAnim = {
  initial: {
    clipPath: "inset(100% 0% 0% 0%)",
  },

  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

const overlayAnim = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

function RevealText({ text, tag = "p", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <div ref={ref}>
      <ClipText
        text={text}
        animate={isInView ? "animate" : "initial"}
        exit="exit"
        tag={tag}
        className={className}
      />
    </div>
  );
}

export function ProjectModal({ project, onCompleteClose }) {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const rafId = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!scrollRef.current) return;

    const wrapper = scrollRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    modalLenis.current = new Lenis({
      wrapper,
      content: wrapper,
      smoothWheel: true,
      syncTouch: true,
      prevent: (node) => !wrapper.contains(node),
    });

    const raf = (time) => {
      modalLenis.current?.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };

    rafId.current = requestAnimationFrame(raf);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      modalLenis.current?.destroy();
      modalLenis.current = null;

      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onCompleteClose}>
      {isOpen && (
        <>
          <motion.div
            onClick={handleClose}
            variants={overlayAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-90 cursor-not-allowed bg-p/5 backdrop-blur-md"
          />

          <motion.div
            ref={container}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 h-[calc(100vh-10px)] w-full max-w-190 bg-s p-2.5 
            backdrop-blur-3xl cursor-s-resize z-9999 max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* CLOSE */}

            <motion.div
              onClick={handleClose}
              initial={{
                scale: 0,
                rotate: -90,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2,
                },
              }}
              exit={{
                scale: 0,
                rotate: 90,
                transition: {
                  duration: 0.4,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className="absolute right-2.5 top-2.5 z-30"
            >
              <motion.button
                whileTap={{
                  scale: 1.1,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-p backdrop-blur-2xl"
              >
                <IoClose
                  className="text-[24px] text-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
                group-hover:rotate-90"
                />
              </motion.button>
            </motion.div>

            {/* SCROLL */}

            <div
              ref={scrollRef}
              className="size-full overflow-y-auto overscroll-contain"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {/* HERO */}

              <div className="relative h-[75vh] w-full overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.name}
                  width={3000}
                  height={3000}
                  placeholder="blur"
                  priority
                  className="size-full object-cover brightness-75 noise"
                />

                <div className="absolute inset-0 bg-p/10" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 py-5">
                  <RevealText
                    text={project.name}
                    tag="h1"
                    className="max-w-175 text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[92%] tracking-[-5%] text-p"
                  />

                  <RevealText
                    text={project.description}
                    className="mt-5 max-w-175 text-[14px] font-medium uppercase leading-[120%] tracking-[-3%] text-p"
                  />
                </div>
              </div>

              {/* INFORMAÇÕES */}

              <div className="grid grid-cols-3 gap-2.5 border-b border-p/15 p-2.5 py-5">
                <div>
                  <RevealText
                    text="category"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={project.category}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="year"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={String(project.year)}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="Type"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={project.type}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>
              </div>

              {/* VISÃO GERAL */}

              <section className="border-b border-p/15 p-2.5 py-25">
                <RevealText
                  text="01 — Overview"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <RevealText
                  text={project.statement}
                  className="max-w-175 text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[100%] tracking-[-5%] text-p"
                />
              </section>

              {/* DETALHES */}

              <section className="grid grid-cols-2 gap-10 border-b border-p/15 p-2.5 py-25 max-md:grid-cols-1">
                <div>
                  <RevealText
                    text="The idea"
                    className="mb-5 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={project.idea}
                    className="max-w-125 text-[14px] font-medium uppercase leading-[125%] tracking-[-3%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="The approach"
                    className="mb-5 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={project.approach}
                    className="max-w-125 text-[14px] font-medium uppercase leading-[125%] tracking-[-3%] text-p"
                  />
                </div>
              </section>

              {/* SEGUNDA IMAGEM */}

              {project.img2 && (
                <motion.div
                  initial={{
                    y: 50,
                  }}
                  whileInView={{
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="relative h-[70vh] w-full overflow-hidden"
                >
                  <Image
                    src={project.img2}
                    alt={`${project.name} detalhe`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    placeholder="blur"
                    className="object-cover"
                  />
                </motion.div>
              )}

              {/* SERVIÇOS */}

              <section className="border-b border-p/15 p-2.5 py-25">
                <RevealText
                  text="02 — Services"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <div className="flex flex-col">
                  {project.services.map((service, index) => (
                    <div
                      key={`${service}-${index}`}
                      className="flex items-center justify-between border-t border-p/15 py-5"
                    >
                      <RevealText
                        text={service}
                        className="text-[14px] font-medium uppercase tracking-[-3%] text-p"
                      />

                      <RevealText
                        text={String(index + 1).padStart(2, "0")}
                        className="text-[14px] font-medium text-p/40"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* TERCEIRA IMAGEM */}

              {project.img3 && (
                <motion.div
                  initial={{
                    y: 50,
                  }}
                  whileInView={{
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="relative h-[80vh] w-full overflow-hidden"
                >
                  <Image
                    src={project.img3}
                    alt={`${project.name} apresentação`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    placeholder="blur"
                    className="object-cover"
                  />
                </motion.div>
              )}

              {/* RESULTADO */}

              <section className="p-2.5 py-25">
                <RevealText
                  text="03 — Result"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <RevealText
                  text={project.result}
                  className="max-w-175 text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[100%] tracking-[-5%] text-p"
                />
              </section>

              {/* RODAPÉ */}

              <footer className="flex min-h-[50vh] flex-col justify-end gap-8 border-t border-p/15 p-2.5 pb-10">
                <div className="flex items-center gap-2.5">
                  <span className="relative -top-0.5 size-2.5 rounded-full bg-p" />

                  <RevealText
                    text={project.name}
                    className="text-[14px] font-medium uppercase tracking-[-2%] leading-[100%] text-p"
                  />
                </div>

                <RevealText
                  text={project.description}
                  className="max-w-100 text-[14px] font-medium uppercase leading-[120%] tracking-[-3%] text-p/60"
                />

                <RevealText
                  text={`Offset® — Selected projects — ${project.year}`}
                  className="text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
