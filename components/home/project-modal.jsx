"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";
import { ClipText } from "../clip-text";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const menuAnim = {
  initial: {
    clipPath: "inset(0% 100% 0% 0%)",
  },

  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: {
      duration: 0.5,
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
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
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

export function ProjectModal({ currentProject, closeProject }) {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    if (!currentProject || !scrollRef.current) return;

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
      }

      modalLenis.current?.destroy();
      modalLenis.current = null;

      document.body.style.overflow = previousOverflow;
    };
  }, [currentProject]);

  return (
    <AnimatePresence>
      {currentProject && (
        <>
          {/* MODAL */}

          <motion.div
            ref={container}
            className="fixed left-0 top-0 z-9999 m-2.5 h-[calc(100vh-10px)] w-full max-w-180 bg-s p-2.5 backdrop-blur-3xl max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* CLOSE */}

            <motion.div
              onClick={closeProject}
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
                  backgroundColor: "#f5f5f5",
                }}
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-p backdrop-blur-2xl"
              >
                <IoClose className="text-[24px] text-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90 group-hover:text-p" />
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
                  src={currentProject.img}
                  alt={currentProject.name}
                  width={3000}
                  height={3000}
                  placeholder="blur"
                  className="size-full object-cover brightness-75 noise"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 py-5">
                  <RevealText
                    text={currentProject.name}
                    tag="h1"
                    className="text-[clamp(48px,8vw,90px)] font-medium uppercase leading-[90%] tracking-[-6%] text-s"
                  />

                  <RevealText
                    text={currentProject.description}
                    className="mt-5 max-w-125 text-[14px] font-medium uppercase leading-[120%] tracking-[-3%] text-s"
                  />
                </div>
              </div>

              {/* INFORMAÇÕES */}

              <div className="grid grid-cols-3 gap-2.5 border-b border-p/20 p-2.5 py-5">
                <div>
                  <RevealText
                    text="Categoria"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={currentProject.category}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="Ano"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={String(currentProject.year)}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="Tipo"
                    className="mb-2 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={currentProject.type}
                    className="text-[14px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>
              </div>

              {/* VISÃO GERAL */}

              <section className="border-b border-p/20 p-2.5 py-25">
                <RevealText
                  text="01 — Visão geral"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <RevealText
                  text={currentProject.statement}
                  className="max-w-155 text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[100%] tracking-[-5%] text-p"
                />
              </section>

              {/* DETALHES */}

              <section className="grid grid-cols-2 gap-10 border-b border-p/20 p-2.5 py-25 max-md:grid-cols-1">
                <div>
                  <RevealText
                    text="A ideia"
                    className="mb-5 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={currentProject.idea}
                    className="max-w-125 text-[14px] font-medium uppercase leading-[125%] tracking-[-3%] text-p"
                  />
                </div>

                <div>
                  <RevealText
                    text="A abordagem"
                    className="mb-5 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                  />

                  <RevealText
                    text={currentProject.approach}
                    className="max-w-125 text-[14px] font-medium uppercase leading-[125%] tracking-[-3%] text-p"
                  />
                </div>
              </section>

              {/* SEGUNDA IMAGEM */}

              {currentProject.img2 && (
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
                    src={currentProject.img2}
                    alt={`${currentProject.name} detalhe`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    placeholder="blur"
                    className="object-cover noise"
                  />
                </motion.div>
              )}

              {/* SERVIÇOS */}

              <section className="border-b border-p/20 p-2.5 py-25">
                <RevealText
                  text="02 — Serviços"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <div className="flex flex-col">
                  {currentProject.services.map((service, index) => (
                    <div
                      key={`${service}-${index}`}
                      className="flex items-center justify-between border-t border-p/20 py-5"
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

              {currentProject.img3 && (
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
                    src={currentProject.img3}
                    alt={`${currentProject.name} apresentação`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    placeholder="blur"
                    className="object-cover noise"
                  />
                </motion.div>
              )}

              {/* RESULTADO */}

              <section className="p-2.5 py-25">
                <RevealText
                  text="03 — Resultado"
                  className="mb-8 text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />

                <RevealText
                  text={currentProject.result}
                  className="max-w-155 text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[100%] tracking-[-5%] text-p"
                />
              </section>

              {/* RODAPÉ */}

              <footer className="flex min-h-[50vh] flex-col justify-end gap-8 border-t border-p/20 p-2.5 pb-10">
                <div className="flex items-center gap-2.5">
                  <span className="size-2.5 rounded-full bg-p" />

                  <RevealText
                    text={currentProject.name}
                    className="text-[11px] font-medium uppercase tracking-[-2%] text-p"
                  />
                </div>

                <RevealText
                  text={currentProject.description}
                  className="max-w-100 text-[14px] font-medium uppercase leading-[120%] tracking-[-3%] text-p/60"
                />

                <RevealText
                  text={`Offset® — Projetos selecionados — ${currentProject.year}`}
                  className="text-[14px] font-medium uppercase tracking-[-2%] text-p/40"
                />
              </footer>
            </div>
          </motion.div>

          {/* SOBREPOSIÇÃO */}

          <motion.div
            className="fixed inset-0 z-900 cursor-not-allowed bg-p/75 backdrop-blur-lg"
            variants={overlayAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeProject}
          />
        </>
      )}
    </AnimatePresence>
  );
}
