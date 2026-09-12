"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ClipText } from "@/components/clip-text";
import { useRouter } from "next/navigation";

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

const ContactModal = ({ onCompleteClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

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
            className="fixed bottom-0 left-1/2 z-100 flex h-160 w-full max-w-190 -translate-x-1/2 cursor-default flex-col justify-between bg-s p-5 max-lg:h-[90svh] max-lg:max-w-none"
            variants={menuAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* CLOSE */}
            <motion.div
              onClick={handleClose}
              initial={{ scale: 0, rotate: -90 }}
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
                whileHover={{ scale: 1.05, backgroundColor: "#f5f5f5" }}
                className="group flex size-12.5 cursor-pointer items-center justify-center bg-p backdrop-blur-2xl"
              >
                <IoClose className="text-[24px] text-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90" />
              </motion.button>
            </motion.div>

            {/* CONTENT */}
            <div className="flex flex-col gap-10 pt-2.5">
              {/* HEADER */}
              <div className="flex items-start justify-between pr-16">
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
                    text="LET'S CREATE SOMETHING TOGETHER?"
                    animate="animate"
                    exit="exit"
                    tag="h2"
                    className="max-w-125 text-[42px] font-medium uppercase leading-[95%] tracking-[-4%] text-p"
                  />
                </motion.div>
              </div>

              {/* FORM */}
              <div className="flex flex-col">
                {/* NAME */}
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <input
                    type="text"
                    placeholder="name"
                    className="h-11 w-full bg-transparent text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none will-change-transform placeholder:text-p/40"
                  />
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <input
                    type="email"
                    placeholder="email"
                    className="h-11 w-full bg-transparent text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none placeholder:text-p/40 will-change-transform"
                  />
                </motion.div>

                {/* PROJECT TYPE */}
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.35,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="group relative overflow-hidden border-b border-p/15"
                >
                  <select
                    defaultValue=""
                    className="h-11 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none will-change-transform"
                  >
                    <option value="" disabled>
                      project type
                    </option>
                    <option value="branding">branding</option>
                    <option value="web-design">web design</option>
                    <option value="art-direction">art direction</option>
                    <option value="graphic-design">graphic design</option>
                    <option value="motion">motion design</option>
                    <option value="other">other</option>
                  </select>
                </motion.div>

                {/* BUDGET + TIMELINE */}
                <div className="grid grid-cols-2 gap-2.5">
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 25, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="group relative overflow-hidden border-b border-p/15 pr-5"
                  >
                    <select
                      defaultValue=""
                      className="h-11 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none will-change-transform"
                    >
                      <option value="" disabled>
                        investment
                      </option>
                      <option value="under-1k">up to €1k</option>
                      <option value="1k-3k">€1k — €3k</option>
                      <option value="3k-5k">€3k — €5k</option>
                      <option value="5k-10k">€5k — €10k</option>
                      <option value="10k-plus">€10k+</option>
                    </select>
                  </motion.div>

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
                    <select
                      defaultValue=""
                      className="h-11 w-full cursor-pointer appearance-none bg-transparent text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none will-change-transform"
                    >
                      <option value="" disabled>
                        timeline
                      </option>
                      <option value="asap">as soon as possible</option>
                      <option value="1-month">up to 1 month</option>
                      <option value="2-months">1 — 2 months</option>
                      <option value="3-months">2 — 3 months</option>
                      <option value="flexible">flexible</option>
                    </select>
                  </motion.div>
                </div>

                {/* MESSAGE */}
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
                  <textarea
                    placeholder="tell us about your project"
                    rows={3}
                    className="w-full resize-none bg-transparent py-4 text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] text-p outline-none will-change-transform placeholder:text-p/40"
                  />
                </motion.div>
              </div>
            </div>

            {/* BOTTOM */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="mt-5 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between gap-10 max-lg:gap-5">
                {/* CONTACT */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] uppercase tracking-[-2%] text-p/40 will-change-transform">
                      or reach out directly
                    </span>

                    <a
                      href="mailto:hello@offset.studio"
                      className="group relative w-fit cursor-pointer overflow-hidden will-change-transform"
                    >
                      <div className="relative">
                        <p className="text-[16px] font-medium uppercase leading-[120%] tracking-[-2%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                          hello@offset.studio
                        </p>
                        <p className="absolute left-0 top-full text-[16px] font-medium uppercase leading-[120%] tracking-[-2%] text-p transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                          hello@offset.studio
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* SEND */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex size-23 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-s bg-p text-s"
                >
                  <span className="relative overflow-hidden will-change-transform">
                    <span className="block text-[14px] font-medium uppercase leading-[120%] tracking-[-2%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      send
                    </span>
                    <span className="absolute left-0 top-full block text-[14px] uppercase leading-[120%] tracking-[-2%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      send
                    </span>
                  </span>
                </motion.button>
              </div>

              {/* FOOTER */}
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
