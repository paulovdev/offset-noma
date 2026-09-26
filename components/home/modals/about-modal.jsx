"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import aboutCover from "@/public/assets/images/about-cover.jpg";

import { menuAnim, overlayAnim, loaderLayerAnim } from "@/anim/modal.anim";

import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { RevealText } from "@/components/ui/reveal-text";
import { CloseButton } from "@/components/ui/close-button";
import { values, clientIcons, services, processSteps } from "../about-data";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function AboutModal({ onCompleteClose }) {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const rafId = useRef(null);
  const { x: mouseX, y: mouseY } = useMousePosition();
  const isMobile = useIsMobile(768);

  const [isHover, setIsHover] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [openServiceIndex, setOpenServiceIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClose = useCallback(() => {
    setIsHover(false);
    setIsOpen(false);
  }, []);

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

  return (
    <>
      <AnimatePresence onExitComplete={onCompleteClose}>
        {isOpen && (
          <>
            {/* OVERLAY */}
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

            {/* MODAL */}
            <motion.div
              ref={container}
              variants={menuAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed bottom-0 left-1/2 z-9999 h-[calc(100vh-10px)] w-full max-w-190 -translate-x-1/2 bg-s px-2.5 pt-2.5 max-lg:m-0 max-lg:h-dvh max-lg:w-screen"
            >
              {/* CLOSE */}
              <AnimatePresence>
                {!isHover && <CloseButton onClick={handleClose} />}
              </AnimatePresence>

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
                    text="About us"
                    className="mb-10 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <RevealText
                    text="We don't believe in design created just to fill space. We build visual systems that define meaning, establish presence, and make brands unforgettable."
                    tag="h1"
                    className="max-w-200 text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />

                  <div className="mt-20 flex items-start justify-between gap-10">
                    <RevealText
                      text="01 — Manifesto"
                      className="text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                    />

                    <RevealText
                      text="Independent design for ideas that aim to leave a mark."
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
                      alt="About the Studio"
                      fill
                      sizes="100vw"
                      placeholder="blur"
                      priority
                      className="object-cover brightness-75"
                    />
                  </motion.figure>
                </section>

                {/* VALUES */}
                <section className="border-b border-p/15 py-20">
                  <RevealText
                    text="02 — Values"
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
                          onPointerEnter={() => setActiveIndex(index)}
                          initial={{ y: 40, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: [0.33, 1, 0.68, 1],
                          }}
                          animate={{
                            flex: isActive ? 1.5 : 1,
                          }}
                          className={`relative flex cursor-pointer flex-col justify-between border border-p/15 p-5 transition-colors duration-500 max-md:h-64 max-md:w-full ${
                            isActive
                              ? "border-p/30 bg-ts"
                              : "bg-transparent hover:border-p/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[32px] font-medium text-p">
                              <Icon />
                            </span>
                          </div>

                          <div>
                            <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                              {item.title}
                            </h3>

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

                {/* SERVICES & DISCIPLINES */}
                <section className="border-b border-p/15 py-20">
                  <RevealText
                    text="03 — Services & Disciplines"
                    className="mb-12 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <div className="flex flex-col">
                    {services.map((service, index) => {
                      const isExpanded = openServiceIndex === index;
                      return (
                        <div
                          key={service.title}
                          onClick={() => toggleService(index)}
                          className={`border-t border-p/15 py-6 transition-colors ${isExpanded ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <button className="flex w-full cursor-pointer items-center justify-between text-left focus:outline-none">
                            <div className="flex items-center gap-6">
                              <span className="text-[14px] font-normal text-p/40">
                                0{index + 1}
                              </span>
                              <h3 className="text-[14px] font-medium uppercase leading-none tracking-[10%] text-p">
                                {service.title}
                              </h3>
                            </div>
                            <span
                              className={`text-[32px] text-ts ${
                                isExpanded ? "rotate-45" : "rotate-0"
                              } transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]`}
                            >
                              <AiOutlinePlus />
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
                                <div className="pl-10 pt-4 max-md:pl-0">
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

                {/* CLIENTS - INFINITE SLIDER */}
                <section className="overflow-hidden border-b border-p/15 py-25">
                  <RevealText
                    text="04 — Selected Clients"
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

                {/* WORK PROCESS */}
                <section className="border-b border-p/15 py-20">
                  <RevealText
                    text="05 — Process"
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

                {/* IMPACT */}
                <section className="border-b border-p/15 py-20">
                  <RevealText
                    text="06 — Impact"
                    className="mb-15 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                      <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                        2017
                      </span>

                      <div className="flex flex-col justify-end">
                        <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                          Founded
                        </span>

                        <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                          Independent by choice
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                      <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
                        40+
                      </span>

                      <div className="flex flex-col justify-end">
                        <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                          Collaborations
                        </span>

                        <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                          Brands, people, and spaces
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                      <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-p">
                        12
                      </span>

                      <div className="flex flex-col justify-end">
                        <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                          Countries
                        </span>

                        <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                          Cross-border engagemenp
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 border-t border-p/15 py-8 max-md:grid-cols-1">
                      <span className="text-[clamp(48px,8vw,100px)] font-instrument font-normal leading-none tracking-[-6%] text-ts">
                        100%
                      </span>

                      <div className="flex flex-col justify-end">
                        <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                          Independence
                        </span>

                        <span className="mt-2 max-w-125 text-[18px] font-instrument font-normal leading-[110%] tracking-[-3%] text-p">
                          Small studio. Big ideas.
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AWARDS */}
                <section className="border-b border-p/15 py-20">
                  <RevealText
                    text="07 — Awards & Recognition"
                    className="mb-12 text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <div className="flex flex-col">
                    {[
                      ["Awwwards", "Honorable Mention", "2025"],
                      ["CSS Design Awards", "Special Kudos", "2024"],
                      ["Behance", "Featured Identity", "2024"],
                      ["Type Directors Club", "Selected Work", "2023"],
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

                {/* FOOTER */}
                <footer className="flex flex-col justify-end gap-10 py-20 pb-10">
                  <RevealText
                    text="08 — Moving Forward"
                    className="text-[14px] font-normal uppercase tracking-[10%] text-p/40"
                  />

                  <RevealText
                    text="We think. We create. We shift how things are perceived."
                    tag="h2"
                    className="max-w-200 text-[clamp(28px,4vw,52px)] font-instrument font-normal leading-[100%] tracking-[-6%] text-p"
                  />

                  <div className="flex items-center justify-between border-t border-p/15 pt-5">
                    <span className="text-[14px] font-normal uppercase tracking-[10%] text-p/40">
                      Independent Studio
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

      <AnimatePresence>
        {isOpen && isHover && !isMobile && (
          <CustomCursor x={mouseX} y={mouseY} />
        )}
      </AnimatePresence>
    </>
  );
}
