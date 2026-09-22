"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";
import { ClipText } from "@/components/clip-text";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

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
      delay: 0.5,
    },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
  },
};

function RevealText({ text, tag = "p", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const { x: mouseX, y: mouseY } = useMousePosition();
  const isMobile = useIsMobile(768);

  const [isHover, setIsHover] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsHover(false);
    setIsOpen(false);
  }, []);

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
      autoResize: true,
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
    <>
      <AnimatePresence onExitComplete={onCompleteClose}>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={handleClose}
              onPointerEnter={() => setIsHover(true)}
              onPointerLeave={() => setIsHover(false)}
              variants={overlayAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[90] cursor-pointer bg-p/5 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              ref={container}
              className="fixed bottom-0 left-1/2 z-[100] h-[calc(100vh-10px)] 
            w-full max-w-190 -translate-x-1/2 bg-s px-2.5 pt-2.5 backdrop-blur-3xl max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
              variants={menuAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Botão Fechar */}
              <AnimatePresence>
                {!isHover && (
                  <motion.div
                    key={isHover}
                    onClick={handleClose}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.76, 0, 0.24, 1],
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
                      whileTap={{ scale: 1.1 }}
                      whileHover={{ scale: 1.1 }}
                      aria-label="Fechar modal"
                      className="group flex size-12.5 cursor-pointer items-center justify-center bg-ts backdrop-blur-2xl"
                    >
                      <IoClose className="text-[24px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="size-full overflow-y-auto overscroll-contain"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Hero */}
                <div className="relative h-[75vh] w-full overflow-hidden">
                  <motion.figure
                    className="size-full overflow-hidden"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    exit={{ scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.1,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      placeholder="blur"
                      priority
                      className="size-full object-cover brightness-75"
                    />
                  </motion.figure>
                  <div className="absolute inset-0 bg-p/10" />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 py-5">
                    <RevealText
                      text={project.name}
                      tag="h1"
                      className="text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                    />

                    <RevealText
                      text={project.description}
                      className="mt-5 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>
                </div>

                {/* Informações */}
                <div className="grid grid-cols-3 gap-2.5 border-b border-p/15 p-2.5 py-5">
                  <div>
                    <RevealText
                      text="categoria"
                      className="mb-2 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />
                    <RevealText
                      text={project.category}
                      className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>

                  <div>
                    <RevealText
                      text="ano"
                      className="mb-2 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />
                    <RevealText
                      text={String(project.year)}
                      className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>

                  <div>
                    <RevealText
                      text="tipo"
                      className="mb-2 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />
                    <RevealText
                      text={project.type}
                      className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>
                </div>

                {/* Visão Geral */}
                <section className="border-b border-p/15 p-2.5 py-25">
                  <RevealText
                    text="01 — Visão geral"
                    className="mb-8 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />
                  <RevealText
                    text={project.statement}
                    className="text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />
                </section>

                {/* Detalhes */}
                <section className="grid grid-cols-2 gap-10 border-b border-p/15 p-2.5 py-25 max-md:grid-cols-1">
                  <div>
                    <RevealText
                      text="A ideia"
                      className="mb-5 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />
                    <RevealText
                      text={project.idea}
                      className="max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>

                  <div>
                    <RevealText
                      text="A abordagem"
                      className="mb-5 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />
                    <RevealText
                      text={project.approach}
                      className="max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                    />
                  </div>
                </section>

                {/* Segunda Imagem */}
                {project.img2 && (
                  <motion.div
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="relative h-[70vh] w-full overflow-hidden"
                  >
                    <Image
                      src={project.img2}
                      alt={`${project.name} detalhe`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      placeholder="blur"
                      className="size-full scale-110 object-cover grayscale-[15%]"
                    />

                    <div className="absolute inset-0 bg-p/5" />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                      <span className="text-[14px] uppercase tracking-[10%] text-p">
                        detalhe
                      </span>
                      <span className="text-[14px] text-p/40">02</span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-5">
                      <span className="text-[14px] uppercase tracking-[10%] text-p/60">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Serviços */}
                <section className="border-b border-p/15 p-2.5 py-25">
                  <RevealText
                    text="02 — Serviços"
                    className="mb-8 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <div className="flex flex-col">
                    {project.services?.map((service, index) => (
                      <div
                        key={`${service}-${index}`}
                        className="flex items-center justify-between border-t border-p/15 py-5"
                      >
                        <RevealText
                          text={service}
                          className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                        />
                        <RevealText
                          text={String(index + 1).padStart(2, "0")}
                          className="text-[14px] font-normal text-p/40"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Resultado */}
                <section className="p-2.5 py-25">
                  <RevealText
                    text="03 — Resultado"
                    className="mb-8 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />
                  <RevealText
                    text={project.result}
                    className="text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />
                </section>

                {/* Terceira Imagem */}
                {project.img3 && (
                  <motion.div
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="relative h-[50vh] w-full overflow-hidden"
                  >
                    <Image
                      src={project.img3}
                      alt={`${project.name} apresentação`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      placeholder="blur"
                      className="size-full scale-200 blur-2xl object-cover grayscale-50"
                    />

                    <div className="absolute inset-0 bg-p/5" />

                    <div className="absolute inset-0 flex items-center justify-between gap-5 p-2.5">
                      {[
                        "@paulovdev",
                        "@offset",
                        "@ht_studio",
                        "@other_lab",
                      ].map((handle, idx) => (
                        <motion.div
                          key={handle}
                          initial={{ scale: 0, rotate: -45 }}
                          exit={{ scale: 0, rotate: -45 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.9,
                            ease: [0.76, 0, 0.24, 1],
                            delay: idx * 0.1,
                          }}
                          className="flex size-40 items-center justify-center rounded-full border border-ts/30 bg-ts/10 backdrop-blur-xl"
                        >
                          <span className="text-[14px] font-normal uppercase tracking-[10%] text-ts">
                            {handle}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Rodapé */}
                <footer className="flex flex-col justify-end gap-8 border-t border-p/15 p-2.5 pb-10 py-25">
                  <div className="flex items-center gap-2.5">
                    <motion.span
                      initial={{ y: 50 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                      className="relative -top-0.5 text-[14px] text-p"
                    >
                      ✳
                    </motion.span>

                    <RevealText
                      text={project.name}
                      className="text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p"
                    />
                  </div>

                  <RevealText
                    text={project.description}
                    className="max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p/60"
                  />

                  <RevealText
                    text={`Offset® — Projetos selecionados — ${project.year}`}
                    className="text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />
                </footer>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isHover && !isMobile && (
          <motion.div
            className="pointer-events-none fixed z-90 size-32 -translate-x-1/2 -translate-y-1/2 
                        flex items-center justify-center rounded-full bg-ts"
            style={{
              left: mouseX,
              top: mouseY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center"
            >
              <IoClose className="text-[32px] text-p" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
