"use client";

import Lenis from "lenis";
import { useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const SMOOTHNESS = 0.08;
const SNAP_STRENGTH = 0.08;
const SCROLL_SPEED = 0.8;
const REPEAT_COUNT = 4;

export function useInfiniteColumns(projectCount, isModalOpen = false) {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);

  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const previousScroll = useRef(0);

  const cycle = useRef(0);
  const singleCardWidth = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const scrollVelocity = useMotionValue(0);

  const realProjectCount = projectCount / REPEAT_COUNT;

  // Função para navegar até um card específico ao clicar no dot
  const scrollToIndex = useCallback(
    (targetIndex) => {
      const cardWidth = singleCardWidth.current;
      if (cardWidth <= 0 || realProjectCount <= 0) return;

      // Descobre quantos passos faltam do índice atual até o clicado (menor caminho)
      let diff = targetIndex - activeIndex;

      // Mantém a navegação pelo caminho mais curto
      if (diff > realProjectCount / 2) diff -= realProjectCount;
      if (diff < -realProjectCount / 2) diff += realProjectCount;

      targetScroll.current -= diff * cardWidth;
    },
    [activeIndex, realProjectCount],
  );

  useEffect(() => {
    const calculateSizes = () => {
      if (!projectsRef.current) return;

      const totalWidth = projectsRef.current.scrollWidth;
      if (totalWidth > 0) {
        cycle.current = totalWidth / REPEAT_COUNT;

        // Pega a largura exata do primeiro filho (card) + gap de 10px
        const firstCard = projectsRef.current.children[0];
        if (firstCard) {
          singleCardWidth.current = firstCard.offsetWidth + 10; // 10px = gap-2.5
        }
      }
    };

    calculateSizes();

    const observer = new ResizeObserver(calculateSizes);
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    window.addEventListener("load", calculateSizes);
    window.addEventListener("resize", calculateSizes);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", calculateSizes);
      window.removeEventListener("resize", calculateSizes);
    };
  }, [projectCount]);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      autoRaf: false,
      virtualScroll: ({ deltaX, deltaY }) => {
        if (isModalOpen || isDragging.current) return false;
        const delta = deltaX || deltaY;
        targetScroll.current -= delta * SCROLL_SPEED;
        return false;
      },
    });

    if (isModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    const container = containerRef.current;

    const handlePointerDown = (event) => {
      if (isModalOpen || (event.pointerType === "mouse" && event.button !== 0))
        return;

      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = event.clientX;
      dragStartScroll.current = targetScroll.current;

      document.body.style.userSelect = "none";
    };

    const handlePointerMove = (event) => {
      if (!isDragging.current || isModalOpen) return;
      const delta = event.clientX - dragStartX.current;
      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }
      targetScroll.current = dragStartScroll.current + delta;
    };

    const handlePointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    const handleClick = (event) => {
      if (!hasDragged.current) return;
      event.preventDefault();
      event.stopPropagation();
      hasDragged.current = false;
    };

    container?.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    container?.addEventListener("click", handleClick, true);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, {
      passive: true,
    });

    let rafId;
    let previousTransform = "";

    const raf = (time) => {
      lenis.raf(time);

      if (!isModalOpen) {
        const cardWidth = singleCardWidth.current;

        // Snap Magnético no Ponto Central Exato do Card
        if (!isDragging.current && cardWidth > 0) {
          const nearestSnap =
            Math.round(targetScroll.current / cardWidth) * cardWidth;
          targetScroll.current +=
            (nearestSnap - targetScroll.current) * SNAP_STRENGTH;
        }

        currentScroll.current +=
          (targetScroll.current - currentScroll.current) * SMOOTHNESS;

        const scroll = currentScroll.current;
        const velocity = scroll - previousScroll.current;
        previousScroll.current = scroll;

        const normalizedVelocity = Math.max(-1, Math.min(1, velocity * 0.15));
        scrollVelocity.set(normalizedVelocity);

        const cycleWidth = cycle.current;

        if (cycleWidth > 0 && projectsRef.current && cardWidth > 0) {
          const offset = ((scroll % cycleWidth) + cycleWidth) % cycleWidth;

          const centerOffset = -cardWidth / 2;
          const translateX = (-cycleWidth + offset + centerOffset).toFixed(2);
          const transform = `translate3d(${translateX}px, 0px, 0px)`;

          if (transform !== previousTransform) {
            projectsRef.current.style.transform = transform;
            previousTransform = transform;
          }

          const realProjects = projectCount / REPEAT_COUNT;
          if (realProjects > 0) {
            const rawIndex = Math.round(-scroll / cardWidth);
            const active =
              ((rawIndex % realProjects) + realProjects) % realProjects;
            setActiveIndex(active);
          }
        }
      } else {
        scrollVelocity.set(0);
      }

      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      container?.removeEventListener("pointerdown", handlePointerDown);
      container?.removeEventListener("click", handleClick, true);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isModalOpen, scrollVelocity, projectCount]);

  return {
    containerRef,
    projectsRef,
    scrollVelocity,
    activeIndex,
    scrollToIndex,
  };
}
