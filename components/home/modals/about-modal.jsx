"use client";

import { ClipText } from "@/components/clip-text";

import { AnimatePresence, motion, useInView } from "framer-motion";

import Lenis from "lenis";

import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import { LuFocus, LuNavigation, LuTrendingUp } from "react-icons/lu";

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

export default function AboutModal({ onCompleteClose }) {
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
          {/* OVERLAY */}
          <motion.div
            onClick={handleClose}
            variants={overlayAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-90 cursor-not-allowed bg-p/5 backdrop-blur-md"
          />

          {/* MODAL */}
          <motion.div
            ref={container}
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 left-1/2 z-9999 h-[calc(100vh-10px)] w-full max-w-190 -translate-x-1/2 cursor-s-resize bg-s p-2.5 max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
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
                whileTap={{ scale: 1.1 }}
                whileHover={{
                  scale: 1.05,
                }}
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-p backdrop-blur-2xl"
              >
                <IoClose className="text-[24px] text-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
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
              {/* HERO / MANIFESTO */}
              <section className="flex flex-col justify-end border-b border-p/15 py-10">
                <RevealText
                  text="Sobre nós"
                  className="mb-10 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <RevealText
                  text="Não acreditamos em design feito apenas para preencher espaços. Criamos sistemas visuais que encontram significado, constroem presença e tornam marcas memoráveis."
                  tag="h1"
                  className="max-w-200 text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                />

                <div className="mt-20 flex items-start justify-between gap-10">
                  <RevealText
                    text="01 — Manifesto"
                    className="text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <RevealText
                    text="Design independente para ideias que querem deixar uma marca."
                    className="max-w-125 text-right text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                  />
                </div>
              </section>

              {/* VALORES */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="02 — Valores"
                  className="mb-10 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-1">
                  {/* VALOR 01 */}
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="flex h-100 aspect-square w-full flex-col justify-between bg-p p-2.5 py-5"
                  >
                    <span className="text-[32px] font-medium text-s">
                      <LuNavigation />
                    </span>

                    <div>
                      <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-s">
                        Clareza
                      </h3>

                      <p className="mt-5 max-w-125 text-[18px] font-instrument font-medium leading-[110%] tracking-[-3%] text-s">
                        Menos ruído. Mais intenção. Cada escolha precisa ter um
                        motivo.
                      </p>
                    </div>
                  </motion.div>

                  {/* VALOR 02 */}
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="flex h-100 aspect-square w-full flex-col justify-between bg-p/90 p-2.5 py-5"
                  >
                    <span className="text-[32px] font-medium text-s">
                      <LuFocus />
                    </span>

                    <div>
                      <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-s">
                        Intenção
                      </h3>

                      <p className="mt-5 max-w-125 text-[18px] font-instrument font-medium leading-[110%] tracking-[-3%] text-s">
                        Criamos com propósito, não seguindo tendências.
                        Estratégia antes da estética.
                      </p>
                    </div>
                  </motion.div>

                  {/* VALOR 03 */}
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="flex h-100 aspect-square w-full flex-col justify-between bg-p/80 p-2.5 py-5"
                  >
                    <span className="text-[32px] font-medium text-s">
                      <LuTrendingUp />
                    </span>

                    <div>
                      <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-s">
                        Impacto
                      </h3>

                      <p className="mt-5 max-w-125 text-[18px] font-instrument font-medium leading-[110%] tracking-[-3%] text-s">
                        O resultado precisa funcionar no mundo real, não apenas
                        na tela.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* IMPACTO */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="03 — Impacto"
                  className="mb-15 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                      2017
                    </span>

                    <div className="flex flex-col justify-end">
                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        Fundação
                      </span>

                      <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                        Independente por escolha
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                      40+
                    </span>

                    <div className="flex flex-col justify-end">
                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        Colaborações
                      </span>

                      <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                        Marcas, pessoas e espaços
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                      12
                    </span>

                    <div className="flex flex-col justify-end">
                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        Países
                      </span>

                      <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                        Trabalho além das fronteiras
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                      100%
                    </span>

                    <div className="flex flex-col justify-end">
                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        Independência
                      </span>

                      <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                        Estúdio pequeno. Grandes ideias.
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* PRÊMIOS */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="04 — Prêmios e reconhecimentos"
                  className="mb-12 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex flex-col">
                  {[
                    ["Awwwards", "Menção Honrosa", "2025"],
                    ["CSS Design Awards", "Special Kudos", "2024"],
                    ["Behance", "Identidade em destaque", "2024"],
                    ["Type Directors Club", "Trabalho selecionado", "2023"],
                    ["D&AD", "Graphite Pencil", "2023"],
                  ].map(([name, award, year], index) => (
                    <motion.div
                      key={`${name}-${year}`}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.05,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="grid grid-cols-[1fr_1fr_auto] items-center gap-5 border-t border-p/15 py-5 max-md:grid-cols-[1fr_auto]"
                    >
                      <span className="text-[14px] font-normal uppercase tracking-[-3%] text-p">
                        {name}
                      </span>

                      <span className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p/60 max-md:hidden">
                        {award}
                      </span>

                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        {year}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ENCERRAMENTO */}
              <footer className="flex flex-col justify-end gap-10 py-20 pb-10">
                <RevealText
                  text="05 — Seguindo em frente"
                  className="text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <RevealText
                  text="Pensamos. Criamos. Mudamos a forma como as coisas são vistas."
                  tag="h2"
                  className="max-w-200 text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                />

                <div className="flex items-center justify-between border-t border-p/15 pt-5">
                  <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                    Estúdio independente
                  </span>

                  <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                    2026
                  </span>
                </div>
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
