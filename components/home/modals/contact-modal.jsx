"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ClipText } from "@/components/clip-text";

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

const ContactModal = ({ onCompleteClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

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

          {/* CAMADA DE CARREGAMENTO / TRANSIÇÃO (bg-ts) */}
          <motion.div
            className="fixed bottom-0 left-1/2 z-[95] h-160 w-full max-w-190 -translate-x-1/2 bg-ts max-lg:h-[90svh] max-lg:max-w-none"
            variants={loaderLayerAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* CONTAINER PRINCIPAL DO CONTEÚDO (bg-s) */}
          <motion.div
            className="fixed bottom-0 left-1/2 z-100 flex h-160 w-full max-w-190 -translate-x-1/2 cursor-default 
            flex-col justify-between bg-s p-5 max-lg:h-[90svh] max-lg:max-w-none"
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* FECHAR */}
            <motion.div
              onClick={handleClose}
              initial={{ scale: 0, rotate: -90 }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.4,
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
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-ts backdrop-blur-2xl"
              >
                <IoClose className="text-[24px] text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
              </motion.button>
            </motion.div>

            {/* CONTEÚDO */}
            <div className="flex flex-col gap-10 pt-2.5">
              {/* CABEÇALHO */}
              <div className="flex items-start justify-between pr-16">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.35,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <ClipText
                    text="Vamos criar algo juntos?"
                    animate="animate"
                    exit="exit"
                    tag="h2"
                    className="max-w-100 text-[38px] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />
                </motion.div>
              </div>

              {/* FORMULÁRIO */}
              <div className="flex flex-col">
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <input
                    type="text"
                    placeholder="nome"
                    className="h-15 w-full bg-transparent text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none will-change-transform placeholder:text-p/40"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <input
                    type="email"
                    placeholder="e-mail"
                    className="h-15 w-full bg-transparent text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none will-change-transform placeholder:text-p/40"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.55,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <select
                    defaultValue=""
                    className="h-15 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-semibold uppercase leading-[100%] tracking-[10%] text-ts outline-none will-change-transform"
                  >
                    <option value="" disabled>
                      tipo de projeto
                    </option>
                    <option value="branding">branding</option>
                    <option value="web-design">design web</option>
                    <option value="art-direction">direção de arte</option>
                    <option value="graphic-design">design gráfico</option>
                    <option value="motion">motion design</option>
                    <option value="other">outro</option>
                  </select>
                </motion.div>

                <div className="grid grid-cols-2 gap-2.5">
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 25, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.6,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="group relative overflow-hidden border-b border-p/15 pr-5"
                  >
                    <select
                      defaultValue=""
                      className="h-15 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-semibold uppercase leading-[100%] tracking-[10%] text-ts outline-none will-change-transform"
                    >
                      <option value="" disabled>
                        investimento
                      </option>
                      <option value="under-1k">até €1 mil</option>
                      <option value="1k-3k">€1 mil — €3 mil</option>
                      <option value="3k-5k">€3 mil — €5 mil</option>
                      <option value="5k-10k">€5 mil — €10 mil</option>
                      <option value="10k-plus">€10 mil+</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 25, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.65,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="group relative overflow-hidden border-b border-p/15"
                  >
                    <select
                      defaultValue=""
                      className="h-15 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-semibold uppercase leading-[100%] tracking-[10%] text-ts outline-none will-change-transform"
                    >
                      <option value="" disabled>
                        prazo
                      </option>
                      <option value="asap">o mais rápido possível</option>
                      <option value="1-month">até 1 mês</option>
                      <option value="2-months">1 — 2 meses</option>
                      <option value="3-months">2 — 3 meses</option>
                      <option value="flexible">flexível</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <textarea
                    placeholder="conte-nos sobre seu projeto"
                    rows={3}
                    className="w-full resize-none bg-transparent py-4 text-[14px] font-normal uppercase leading-[100%] tracking-[10%] text-p outline-none will-change-transform placeholder:text-p/40"
                  />
                </motion.div>
              </div>
            </div>

            {/* PARTE INFERIOR */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.75,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="mt-5 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between gap-10 max-lg:gap-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] uppercase tracking-[10%] text-p/40 will-change-transform">
                      ou fale diretamente conosco
                    </span>

                    <a
                      href="mailto:hello@offset.studio"
                      className="group relative w-fit cursor-pointer overflow-hidden will-change-transform"
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

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative size-28 shrink-0 cursor-pointer flex items-center justify-center overflow-hidden rounded-full border-2 border-s bg-ts text-p"
                >
                  <span className="relative overflow-hidden will-change-transform">
                    <span className="block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      enviar
                    </span>
                    <span className="absolute left-0 top-full block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      enviar
                    </span>
                  </span>
                </motion.button>
              </div>

              <div className="flex items-center justify-between border-t border-p/20 pt-4">
                <div className="flex gap-5">
                  <a
                    href="#"
                    className="group relative w-fit overflow-hidden text-[14px] uppercase tracking-[-3%] text-p/40"
                  >
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      instagram
                    </span>
                    <span className="absolute left-0 top-full block text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      instagram
                    </span>
                  </a>

                  <a
                    href="#"
                    className="group relative w-fit overflow-hidden text-[14px] uppercase tracking-[-3%] text-p/40"
                  >
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      behance
                    </span>
                    <span className="absolute left-0 top-full block text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      behance
                    </span>
                  </a>

                  <a
                    href="#"
                    className="group relative w-fit overflow-hidden text-[14px] uppercase tracking-[-3%] text-p/40"
                  >
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      linkedin
                    </span>
                    <span className="absolute left-0 top-full block text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      linkedin
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
