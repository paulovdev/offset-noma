"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { ClipText } from "@/components/clip-text";
import Lenis from "lenis";
import { AiOutlinePlus } from "react-icons/ai";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

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
      delay: 0.25,
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
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.25 },
  },
};

const fieldAnim = {
  initial: { y: 25, opacity: 0 },
  animate: (custom) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.45 + custom * 0.05,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
  exit: { y: 25, opacity: 0, transition: { duration: 0.3 } },
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

export function ContactModal({ onCompleteClose }) {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const rafId = useRef(null);
  
  const isMobile = useIsMobile(768);
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [isOpen, setIsOpen] = useState(true);
  const [isHover, setIsHover] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

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

  const faqs = [
    {
      q: "Qual é o prazo médio de um projeto?",
      a: "Projetos de identidade visual costumam levar de 3 a 5 semanas. Websites e plataformas complexas variam entre 6 a 12 semanas.",
    },
    {
      q: "Trabalham com clientes internacionais?",
      a: "Sim. Atendemos marcas globais com comunicação totalmente em inglês ou português e gestão de fuso horário adaptada.",
    },
    {
      q: "Como funciona o fluxo de trabalho?",
      a: "Imersão & Pesquisa → Estratégia de Marca → Direção Visual → Desenvolvimento & Handover técnico.",
    },
  ];

  return (
    <>
      <AnimatePresence onExitComplete={onCompleteClose}>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              onClick={handleClose}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              variants={overlayAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-90 bg-p/5 backdrop-blur-md cursor-pointer"
            />

            {/* CAMADA DE TRANSIÇÃO (bg-ts) */}
            <motion.div
              className="fixed bottom-0 left-1/2 z-96 h-[calc(100vh-10px)] w-full max-w-190 -translate-x-1/2
             bg-ts max-lg:h-dvh max-lg:w-screen"
              variants={loaderLayerAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            {/* CONTAINER PRINCIPAL DO CONTEÚDO (bg-s) */}
            <motion.div
              ref={container}
              className="fixed bottom-0 left-1/2 z-9999 h-[calc(100vh-10px)] w-full max-w-190 
            -translate-x-1/2 cursor-s-resize bg-s px-2.5 pt-2.5 backdrop-blur-3xl max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
              variants={menuAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* FECHAR */}
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
                        duration: 0.3,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }}
                    className="absolute right-2.5 top-2.5 z-30"
                  >
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      whileHover={{ scale: 1.1 }}
                      aria-label="Fechar contato"
                      className="group flex size-12.5 cursor-pointer items-center justify-center bg-ts backdrop-blur-2xl"
                    >
                      <IoClose className="text-[24px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* CONTEÚDO SCROLLÁVEL */}
              <div
                ref={scrollRef}
                className="size-full overflow-y-auto overscroll-contain"
                style={{ scrollbarWidth: "none" }}
              >
                {/* HERO / MANIFESTO */}
                <div className="flex flex-col justify-end border-b border-p/15 py-10">
                  <RevealText
                    text="contato"
                    className="mb-10 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />
                  <RevealText
                    text="Vamos começar um projeto juntos."
                    tag="h1"
                    className="max-w-200 text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />

                  {/* FORMULÁRIO COM BORDAS ANIMADAS */}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-16 flex flex-col"
                  >
                    {/* Nome */}
                    <motion.div
                      custom={0}
                      variants={fieldAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                    >
                      <input
                        type="text"
                        required
                        placeholder="nome *"
                        className="h-20 w-full bg-transparent text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none placeholder:text-p/40"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      custom={1}
                      variants={fieldAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                    >
                      <input
                        type="email"
                        required
                        placeholder="e-mail *"
                        className="h-20 w-full bg-transparent text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none placeholder:text-p/40"
                      />
                    </motion.div>

                    {/* Tipo de Projeto */}
                    <motion.div
                      custom={2}
                      variants={fieldAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                    >
                      <select
                        defaultValue=""
                        className="h-20 w-full cursor-pointer appearance-none bg-transparent 
                      text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-ts outline-none"
                      >
                        <option value="" disabled className="bg-s text-ts">
                          tipo de projeto
                        </option>
                        <option value="branding" className="bg-s text-ts">
                          branding
                        </option>
                        <option value="web-design" className="bg-s text-ts">
                          design web
                        </option>
                        <option value="art-direction" className="bg-s text-ts">
                          direção de arte
                        </option>
                        <option value="graphic-design" className="bg-s text-ts">
                          design gráfico
                        </option>
                        <option value="motion" className="bg-s text-ts">
                          motion design
                        </option>
                        <option value="other" className="bg-s text-ts">
                          outro
                        </option>
                      </select>
                      <IoChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-p/40 transition-transform duration-300 group-focus-within:rotate-180" />
                    </motion.div>

                    {/* Grid de Investimento e Prazo */}
                    <div className="grid grid-cols-2 gap-2.5 max-md:grid-cols-1">
                      <motion.div
                        custom={3}
                        variants={fieldAnim}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                      >
                        <select
                          defaultValue=""
                          className="h-20 w-full cursor-pointer appearance-none bg-transparent 
                        text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-ts outline-none"
                        >
                          <option value="" disabled className="bg-s text-ts">
                            investimento
                          </option>
                          <option value="under-1k" className="bg-s text-ts">
                            até €1 mil
                          </option>
                          <option value="1k-3k" className="bg-s text-ts">
                            €1 mil — €3 mil
                          </option>
                          <option value="3k-5k" className="bg-s text-ts">
                            €3 mil — €5 mil
                          </option>
                          <option value="5k-10k" className="bg-s text-ts">
                            €5 mil — €10 mil
                          </option>
                          <option value="10k-plus" className="bg-s text-ts">
                            €10 mil+
                          </option>
                        </select>
                        <IoChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-p/40 transition-transform duration-300 group-focus-within:rotate-180" />
                      </motion.div>

                      <motion.div
                        custom={4}
                        variants={fieldAnim}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                      >
                        <select
                          defaultValue=""
                          className="h-20 w-full cursor-pointer appearance-none bg-transparent
                         text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-ts outline-none"
                        >
                          <option value="" disabled className="bg-s text-ts">
                            prazo
                          </option>
                          <option value="asap" className="bg-s text-ts">
                            o mais rápido possível
                          </option>
                          <option value="1-month" className="bg-s text-ts">
                            até 1 mês
                          </option>
                          <option value="2-months" className="bg-s text-ts">
                            1 — 2 meses
                          </option>
                          <option value="3-months" className="bg-s text-ts">
                            2 — 3 meses
                          </option>
                          <option value="flexible" className="bg-s text-ts">
                            flexível
                          </option>
                        </select>
                        <IoChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-p/40 transition-transform duration-300 group-focus-within:rotate-180" />
                      </motion.div>
                    </div>

                    {/* Mensagem */}
                    <motion.div
                      custom={5}
                      variants={fieldAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="group relative mb-5 border-b border-p/15 focus-within:border-ts transition-colors duration-500"
                    >
                      <textarea
                        placeholder="conte-nos sobre seu projeto *"
                        rows={3}
                        className="w-full resize-none bg-transparent py-10 text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none placeholder:text-p/40"
                      />
                    </motion.div>
                    <motion.button
                      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{
                        clipPath: "inset(0% 0% 0% 0%)",
                      }}
                      exit={{
                        clipPath: "inset(100% 0% 0% 0%)",
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="group relative w-full h-20 shrink-0 cursor-pointer 
                    flex items-center justify-center overflow-hidden border-2 border-s bg-ts text-p"
                    >
                      <span className="relative overflow-hidden">
                        <span className="block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                          enviar
                        </span>
                        <span className="absolute left-0 top-full block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                          enviar
                        </span>
                      </span>
                    </motion.button>
                  </form>
                </div>

                {/* PERGUNTAS FREQUENTES (FAQ) */}
                <section className="border-b border-p/15 py-16">
                  <RevealText
                    text="duvidas frequentes"
                    className="mb-8 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <div className="flex flex-col">
                    {faqs.map((faq, index) => {
                      const isOpenFaq = activeFaq === index;
                      return (
                        <div
                          key={faq.a}
                          className="border-t border-p/15 py-6 transition-colors"
                        >
                          <button
                            onClick={() =>
                              setActiveFaq(isOpenFaq ? null : index)
                            }
                            className="flex w-full cursor-pointer items-center justify-between text-left focus:outline-none"
                          >
                            <div className="flex items-center gap-6">
                              <span className="text-[14px] font-normal text-p/40">
                                0{index + 1}
                              </span>
                              <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                                {faq.q}
                              </h3>
                            </div>
                            <span
                              className={`text-[32px] text-ts ${isOpenFaq ? "rotate-45" : "rotate-0"} 
                            transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                            `}
                            >
                              <AiOutlinePlus />
                            </span>
                          </button>

                          <AnimatePresence>
                            {isOpenFaq && (
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
                                    text={faq.a}
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

                {/* RODAPÉ & ENVIO */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.75,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="mt-16 flex flex-col gap-8 pb-10"
                >
                  <div className="flex items-center justify-between gap-10 max-lg:gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] uppercase tracking-[10%] text-p/40">
                        ou fale diretamente conosco
                      </span>

                      <a
                        href="mailto:hello@offset.studio"
                        className="group relative w-fit cursor-pointer overflow-hidden"
                      >
                        <div className="relative">
                          <p className="text-[16px] font-normal uppercase leading-[100%] tracking-[10%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                            hello@offset.studio
                          </p>
                          <p className="absolute left-0 top-full text-[16px] font-normal uppercase leading-[100%] tracking-[10%] text-ts transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                            hello@offset.studio
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* REDES SOCIAIS */}
                  <div className="flex items-center justify-between border-t border-p/20 pt-6">
                    <div className="flex gap-5">
                      {["instagram", "behance", "linkedin", "twitter"].map(
                        (social) => (
                          <a
                            key={social}
                            href="#"
                            className="group relative w-fit overflow-hidden text-[14px] uppercase tracking-[-3%] text-p/40"
                          >
                            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                              {social}
                            </span>
                            <span className="absolute left-0 top-full block text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                              {social}
                            </span>
                          </a>
                        ),
                      )}
                    </div>

                    <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40 max-md:hidden">
                      Offset® 2026
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isHover && !isMobile && (
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

export default ContactModal;
