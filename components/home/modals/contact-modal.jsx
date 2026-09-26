"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

import {
  menuAnim,
  overlayAnim,
  itemAnim,
  loaderLayerAnim,
} from "@/anim/modal.anim";

import { RevealText } from "@/components/ui/reveal-text";
import { CloseButton } from "@/components/ui/close-button";
import { CustomCursor } from "@/components/ui/custom-cursor";

const TAGS = [
  "Branding",
  "Web Design",
  "Development",
  "Design System",
  "Motion",
  "Strategy",
  "E-Commerce",
  "Consulting",
];

const BUDGET_RANGES = [
  "<$5k",
  "$5k - $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
];

export function ContactModal({ onCompleteClose }) {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const rafId = useRef(null);

  const { x: mouseX, y: mouseY } = useMousePosition();
  const isMobile = useIsMobile(768);

  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Form State
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsHover(false);
    setIsOpen(false);
  }, []);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
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
              className="fixed inset-0 z-90 cursor-pointer bg-p/5 backdrop-blur-md"
            />

            <motion.div
              className="fixed bottom-0 left-1/2 z-95 h-[calc(100vh-10px)] w-full max-w-190 -translate-x-1/2 bg-ts max-lg:h-dvh max-lg:w-screen"
              variants={loaderLayerAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            {/* Modal Container */}
            <motion.div
              ref={container}
              className="fixed bottom-0 left-1/2 z-100 flex h-[calc(100vh-10px)] w-full max-w-190 -translate-x-1/2 flex-col bg-s px-2.5 pt-2.5 backdrop-blur-3xl max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
              variants={menuAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Close Button */}
              <AnimatePresence>
                {!isHover && <CloseButton onClick={handleClose} />}
              </AnimatePresence>

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="flex size-full flex-col overflow-y-auto overscroll-contain"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Intro Section Novo */}
                <section className="border-b border-p/15 p-2.5 pt-20 pb-16">
                  <RevealText
                    text="01 — Get in touch"
                    className="mb-8 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />
                  <RevealText
                    text="Let's work together."
                    tag="h1"
                    className="text-[clamp(36px,5vw,64px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />
                  <RevealText
                    text="Available for freelance projects, design systems, and full-stack web applications."
                    className="mt-6 max-w-125 text-[18px] font-instrument font-normal leading-[120%] tracking-[-3%] text-p/70"
                  />
                </section>

                {/* Form Section Original */}
                <form onSubmit={handleSubmit} className="p-2.5 py-12">
                  {/* Step 1: Services */}
                  <div className="border-b border-p/15 pb-12">
                    <RevealText
                      text="I'm interested in..."
                      className="mb-6 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />

                    <div className="flex flex-wrap gap-2.5">
                      {TAGS.map((tag, idx) => {
                        const isSelected = selectedServices.includes(tag);
                        return (
                          <motion.button
                            key={tag}
                            type="button"
                            onClick={() => toggleService(tag)}
                            variants={itemAnim}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            custom={idx * 0.5}
                            className={`cursor-pointer rounded-full border px-5 py-2.5 text-[14px] font-normal tracking-[-2%] transition-all duration-300 ${
                              isSelected
                                ? "border-ts bg-ts text-p"
                                : "border-p/20 bg-transparent text-p hover:border-ts/50"
                            }`}
                          >
                            {tag}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Budget */}
                  <div className="border-b border-p/15 py-12">
                    <RevealText
                      text="Budget range"
                      className="mb-6 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />

                    <div className="flex flex-wrap gap-2.5">
                      {BUDGET_RANGES.map((range, idx) => {
                        const isSelected = selectedBudget === range;
                        return (
                          <motion.button
                            key={range}
                            type="button"
                            onClick={() => setSelectedBudget(range)}
                            variants={itemAnim}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            custom={idx * 0.5}
                            className={`cursor-pointer rounded-full border px-5 py-2.5 text-[14px] font-normal tracking-[-2%] transition-all duration-300 ${
                              isSelected
                                ? "border-ts bg-ts text-p"
                                : "border-p/20 bg-transparent text-p hover:border-ts/50"
                            }`}
                          >
                            {range}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Fields */}
                  <motion.div
                    className="flex flex-col gap-8 py-12"
                    variants={itemAnim}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0}
                  >
                    <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                      <motion.div
                        className="flex flex-col gap-2"
                        variants={itemAnim}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={2}
                      >
                        <label className="text-[12px] uppercase tracking-[10%] text-p/40">
                          Your Name <span className="text-ts">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="border-b border-p/20 bg-transparent py-2 text-[18px] font-instrument text-p outline-none transition-colors focus:border-ts"
                        />
                      </motion.div>

                      <motion.div
                        className="flex flex-col gap-2"
                        variants={itemAnim}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={4}
                      >
                        <label className="text-[12px] uppercase tracking-[10%] text-p/40">
                          Your Email <span className="text-ts">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="border-b border-p/20 bg-transparent py-2 text-[18px] font-instrument text-p outline-none transition-colors focus:border-ts"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      className="flex flex-col gap-2"
                      variants={itemAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={6}
                    >
                      <label className="text-[12px] uppercase tracking-[10%] text-p/40">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Inc."
                        className="border-b border-p/20 bg-transparent py-2 text-[18px] font-instrument text-p outline-none transition-colors focus:border-ts"
                      />
                    </motion.div>

                    <motion.div
                      className="flex flex-col gap-2"
                      variants={itemAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={8}
                    >
                      <label className="text-[12px] uppercase tracking-[10%] text-p/40">
                        Project Details <span className="text-ts">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, timeline, and goals..."
                        className="resize-none border-b border-p/20 bg-transparent py-2 text-[18px] font-instrument text-p 
                        outline-none transition-colors focus:border-ts"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  {/* Definimos a altura fixa idêntica ao botão (h-20 / max-md:h-15) no container pai */}
                  <div className="relative h-20 max-md:h-15 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="reveal"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                          }}
                          className="absolute inset-0 flex items-center justify-center w-full"
                        >
                          <RevealText
                            text="Thank you! Your message has been sent successfully."
                            className="text-center text-[14px] font-normal uppercase tracking-[10%] text-ts"
                          />
                        </motion.div>
                      ) : (
                        <motion.button
                          key="submit-button"
                          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                          animate={{
                            clipPath: "inset(0% 0% 0% 0%)",
                            transition: {
                              duration: 1,
                              ease: [0.76, 0, 0.24, 1],
                            },
                          }}
                          exit={{
                            clipPath: "inset(100% 0% 0% 0%)",
                            transition: {
                              duration: 0.8,
                              ease: [0.76, 0, 0.24, 1],
                            },
                          }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="group absolute inset-0 w-full h-full cursor-pointer 
                   flex items-center justify-center overflow-hidden border-2 border-s bg-ts text-p"
                        >
                          <span className="relative overflow-hidden">
                            <span className="block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                              {isSubmitting ? "Sending..." : "Send Message"}
                            </span>
                            <span className="absolute left-0 top-full block text-[14px] font-medium uppercase leading-[100%] tracking-[10%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                              {isSubmitting ? "Sending..." : "Send Message"}
                            </span>
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>

                {/* Direct Contact Footer */}
                <footer className="mt-auto flex flex-col justify-end border-t border-p/15 p-2.5 py-12">
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] uppercase tracking-[10%] text-p/40">
                      Or email directly
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

                  <div className="mt-12 flex items-center justify-between text-[14px] uppercase tracking-[10%] text-p/40">
                    <span>Offset® — 2026</span>
                    <span>All rights reserved</span>
                  </div>
                </footer>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <AnimatePresence>
        {isOpen && isHover && !isMobile && (
          <CustomCursor x={mouseX} y={mouseY} />
        )}
      </AnimatePresence>
    </>
  );
}
