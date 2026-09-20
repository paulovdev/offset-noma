"use client";

import { ClipText } from "@/components/clip-text";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import aboutCover from "@/public/assets/images/about-cover.jpg";

import { IoAdd, IoClose, IoRemove } from "react-icons/io5";
import { LuFocus, LuNavigation, LuTrendingUp } from "react-icons/lu";

import {
  SiAmd,
  SiApple,
  SiFigma,
  SiGoogle,
  SiNike,
  SiNotion,
  SiSpotify,
  SiVercel,
} from "react-icons/si";
import Image from "next/image";

const loaderLayerAnim = {
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
      delay: 1,
    },
  },
};

const menuAnim = {
  initial: {
    clipPath: "inset(100% 0% 0% 0%)",
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
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
      delay: 1,
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
  const [openServiceIndex, setOpenServiceIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleService = (index) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index);
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

  // Lista de Ícones para o Slider Infinito
  const clientIcons = [
    SiNike,
    SiApple,
    SiSpotify,
    SiVercel,
    SiFigma,
    SiNotion,
    SiAmd,
    SiGoogle,
  ];

  // Dados dos Serviços
  const services = [
    {
      title: "Estratégia & Posicionamento",
      desc: "Análise de mercado, diagnóstico de marca e diretrizes fundamentais para destacar seu negócio de maneira autêntica e escalável.",
    },
    {
      title: "Sistemas de Identidade Visual",
      desc: "Logotipos, tipografia customizada, paleta de cores e guias de estilo escaláveis para qualquer suporte digital ou impresso.",
    },
    {
      title: "Experiências Digitais & UI/UX",
      desc: "Websites, aplicações e plataformas interativas desenhadas com foco absoluto em performance, usabilidade e estético contemporânea.",
    },
    {
      title: "Motion & Direção de Arte",
      desc: "Animações, vídeos institucionais e direção visual de campanhas para narrativas marcantes e engajadoras.",
    },
  ];

  // Etapas do Processo
  const processSteps = [
    {
      step: "01",
      title: "Imersão & Diagnóstico",
      desc: "Compreendemos o contexto, desafios e objetivos reais do projeto.",
    },
    {
      step: "02",
      title: "Estratégia & Conceito",
      desc: "Definimos o caminho criativo e as bases visuais da solução.",
    },
    {
      step: "03",
      title: "Execução & Refinamento",
      desc: "Desenvolvemos o sistema com precisão técnica e atenção aos detalhes.",
    },
    {
      step: "04",
      title: "Entrega & Implementação",
      desc: "Entregamos sistemas prontos para o mundo real e suporte contínuo.",
    },
  ];

  const values = [
    {
      id: 1,
      icon: LuNavigation,
      title: "Clareza",
      desc: "Menos ruído. Mais intenção. Cada escolha precisa ter um motivo.",
    },
    {
      id: 2,
      icon: LuFocus,
      title: "Intenção",
      desc: "Criamos com propósito, não seguindo tendências. Estratégia antes da estética.",
    },
    {
      id: 3,
      icon: LuTrendingUp,
      title: "Impacto",
      desc: "O resultado precisa funcionar no mundo real, não apenas na tela.",
    },
  ];

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

          <motion.div
            className="fixed bottom-0 left-1/2 z-[95] h-[calc(100vh-10px)] 
            w-full max-w-190 -translate-x-1/2 bg-ts max-lg:h-dvh max-lg:max-w-none"
            variants={loaderLayerAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* MODAL */}
          <motion.div
            ref={container}
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 left-1/2 z-9999 h-[calc(100vh-10px)] 
            w-full max-w-190 -translate-x-1/2 cursor-s-resize bg-s px-2.5 pt-2.5 max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
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
                  scale: 1.1,
                }}
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-ts backdrop-blur-2xl"
              >
                <IoClose className="text-[24px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
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

              <section className="relative h-[75vh] w-full overflow-hidden">
                <motion.figure
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="relative z-0 size-full overflow-hidden"
                >
                  <Image
                    src={aboutCover}
                    alt="Sobre o Estúdio"
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    priority
                    className="object-cover brightness-75"
                  />
                </motion.figure>
              </section>

              {/* VALORES */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="02 — Valores"
                  className="mb-10 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex h-100 gap-2.5 max-md:h-auto max-md:flex-col">
                  {values.map((item, index) => {
                    const isActive = activeIndex === index;
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setActiveIndex(index)}
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                        animate={{
                          flex: isActive ? 2 : 1,
                        }}
                        className={`relative flex cursor-pointer flex-col justify-between border border-p/15 p-5 transition-colors duration-500 max-md:h-64 max-md:w-full ${
                          isActive
                            ? "bg-ts border-p/30"
                            : "bg-transparent hover:border-p/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[32px] font-medium text-p">
                            <Icon />
                          </span>
                          <span className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p/50">
                            0{index + 1}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                            {item.title}
                          </h3>

                          {/* Apenas o conteúdo textual expande ou ajusta visualmente */}
                          <motion.p
                            animate={{
                              opacity: isActive ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.3 }}
                            className="mt-5 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p"
                          >
                            {item.desc}
                          </motion.p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* SERVIÇOS & DISCIPLINAS (ACCORDION COM REVEAL TEXT) */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="03 — Serviços & Disciplinas"
                  className="mb-12 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex flex-col">
                  {services.map((service, index) => {
                    const isExpanded = openServiceIndex === index;
                    return (
                      <div
                        key={service.title}
                        className="border-t border-p/15 py-6 transition-colors"
                      >
                        <button
                          onClick={() => toggleService(index)}
                          className="flex w-full cursor-pointer items-center justify-between text-left focus:outline-none"
                        >
                          <div className="flex items-center gap-6">
                            <span className="text-[14px] font-normal text-p/40">
                              0{index + 1}
                            </span>
                            <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                              {service.title}
                            </h3>
                          </div>
                          <span className="text-[24px] text-p/60">
                            {isExpanded ? <IoRemove /> : <IoAdd />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.5,
                                ease: [0.76, 0, 0.24, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pl-10 max-md:pl-0">
                                <RevealText
                                  text={service.desc}
                                  className="max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p/75"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* CLIENTES - INFINITY SLIDE APENAS ÍCONES */}
              <section className="border-b border-p/15 py-25 overflow-hidden">
                <RevealText
                  text="04 — Clientes Selecionados"
                  className="mb-15 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="relative flex w-full overflow-hidden">
                  <motion.div
                    className="flex min-w-full shrink-0 items-center justify-around gap-12 pr-12"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 20,
                    }}
                  >
                    {clientIcons.map((Icon, idx) => (
                      <Icon
                        key={`icon-1-${idx}`}
                        className="text-[36px] text-p/80 transition-opacity hover:opacity-100"
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex min-w-full shrink-0 items-center justify-around gap-12 pr-12"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 20,
                    }}
                  >
                    {clientIcons.map((Icon, idx) => (
                      <Icon
                        key={`icon-2-${idx}`}
                        className="text-[36px] text-p/80 transition-opacity hover:opacity-100"
                      />
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* PROCESSO DE TRABALHO (ESTILO SEÇÃO 07) */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="05 — Processo"
                  className="mb-12 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex flex-col">
                  {processSteps.map((item, index) => (
                    <motion.div
                      key={item.step}
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
                      <span className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                        {item.title}
                      </span>

                      <span className="text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p/60 max-md:hidden">
                        {item.desc}
                      </span>

                      <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                        {item.step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* IMPACTO */}
              <section className="border-b border-p/15 py-20">
                <RevealText
                  text="06 — Impacto"
                  className="mb-15 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                />

                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
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
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
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
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
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
                    <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
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
                  text="07 — Prêmios e reconhecimentos"
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
                      <span className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
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
                  text="08 — Seguindo em frente"
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
