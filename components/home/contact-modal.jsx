'use client";';

import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { ClipText } from "../clip-text";
const menuAnim = {
  initial: {
    clipPath: "inset(100% 0% 0% 0%)",
  },

  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
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
const ContactModal = ({ onClose }) => {
  return (
    <>
      <motion.div
        onClick={onClose}
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-90 cursor-not-allowed bg-p/5 backdrop-blur-md"
      />
      <motion.div
        className="fixed bottom-0 left-1/2 z-100 
        flex h-100 max-w-100 w-full -translate-x-1/2 
        flex-col justify-between bg-s p-5 cursor-default"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          onClick={onClose}
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
          }}
          exit={{
            scale: 0,
            rotate: 90,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          className="absolute right-2.5 top-2.5 z-30"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "#f5f5f5" }}
            className="group flex size-12.5 cursor-pointer items-center justify-center bg-p backdrop-blur-2xl"
          >
            <IoClose className="text-[24px] text-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90 group-hover:text-p" />
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-10 pt-2.5">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <ClipText
              text="Vamos criar algo juntos?"
              animate="animate"
              exit="exit"
              tag="h2"
              className="max-w-70 text-[28px] font-normal uppercase leading-[95%] tracking-[-5%] text-p"
            />
          </motion.div>

          <div className="flex flex-col">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group relative overflow-hidden border-b border-p/30"
            >
              <input
                type="text"
                placeholder="nome"
                className="h-10 w-full bg-transparent text-[14px] font-normal uppercase leading-[120%] tracking-[-4%] text-p outline-none placeholder:text-p/50"
              />
            </motion.div>

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group relative overflow-hidden border-b border-p/30"
            >
              <input
                type="email"
                placeholder="email"
                className="h-10 w-full bg-transparent text-[14px] font-normal uppercase leading-[120%] tracking-[-4%] text-p outline-none placeholder:text-p/50"
              />
            </motion.div>

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group relative overflow-hidden border-b border-p/30"
            >
              <textarea
                placeholder="mensagem"
                rows={2}
                className="w-full resize-none bg-transparent py-2 text-[14px] font-normal uppercase leading-[120%] tracking-[-4%] text-p outline-none placeholder:text-p/50"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-end justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[-2%] text-p/50">
              ou fale diretamente
            </span>

            <a
              href="mailto:hello@offset.studio"
              className="group relative w-fit cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <p className="text-[14px] font-normal uppercase leading-[120%] tracking-[-4%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  hello@offset.studio
                </p>
                <p className="absolute left-0 top-full text-[14px] font-normal uppercase leading-[120%] tracking-[-4%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  hello@offset.studio
                </p>
              </div>
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex size-17 cursor-pointer 
            items-center justify-center overflow-hidden rounded-full border-2 border-p text-p"
          >
            <span className="relative overflow-hidden">
              <span className="block text-[12px] will-change-transform font-medium uppercase leading-[120%] tracking-[-4%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                enviar
              </span>
              <span className="absolute left-0 top-full block will-change-transform text-[12px] uppercase leading-[120%] tracking-[-4%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                enviar
              </span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ContactModal;
