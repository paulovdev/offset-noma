"use client";

import Lenis from "lenis";
import { useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const SMOOTHNESS = 0.025;

const SCROLL_SPEED = 0.5;
const REPEAT_COUNT = 4;

export function useInfiniteColumns(projectCount, isModalOpen = false) {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);

  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const previousScroll = useRef(0);

  const cycle = useRef(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const scrollVelocity = useMotionValue(0);

  // Recálculo preciso da largura com tratamento para imagens/carregamento
  useEffect(() => {
    const calculateCycle = () => {
      if (!projectsRef.current) return;
      // Garante que pegamos a largura exata dividida pelo total de repetições
      const totalWidth = projectsRef.current.scrollWidth;
      if (totalWidth > 0) {
        cycle.current = totalWidth / REPEAT_COUNT;
      }
    };

    calculateCycle();

    const observer = new ResizeObserver(calculateCycle);
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    // Listener adicional para quando todas as imagens terminarem de carregar
    window.addEventListener("load", calculateCycle);
    window.addEventListener("resize", calculateCycle);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", calculateCycle);
      window.removeEventListener("resize", calculateCycle);
    };
  }, [projectCount]);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      autoRaf: false,
      virtualScroll: ({ deltaX, deltaY }) => {
        if (isModalOpen || isDragging.current) return false;
        const delta = deltaX || deltaY;
        targetScroll.current += delta * SCROLL_SPEED;
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

      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    };

    const handlePointerMove = (event) => {
      if (!isDragging.current || isModalOpen) return;
      const delta = event.clientX - dragStartX.current;
      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }
      targetScroll.current = dragStartScroll.current - delta;
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
        currentScroll.current +=
          (targetScroll.current - currentScroll.current) * SMOOTHNESS;

        const scroll = currentScroll.current;
        const velocity = scroll - previousScroll.current;
        previousScroll.current = scroll;

        const normalizedVelocity = Math.max(-1, Math.min(1, velocity * 0.15));
        scrollVelocity.set(normalizedVelocity);

        const cycleWidth = cycle.current;

        if (cycleWidth > 0 && projectsRef.current) {
          const offset = ((scroll % cycleWidth) + cycleWidth) % cycleWidth;

          // Arredondamento para 2 casas decimais evita sub-pixel rendering excessivo na GPU
          const translateX = (-cycleWidth + offset).toFixed(2);
          const transform = `translate3d(${translateX}px, 0px, 0px)`;

          if (transform !== previousTransform) {
            projectsRef.current.style.transform = transform;
            previousTransform = transform;
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
  }, [isModalOpen, scrollVelocity]);

  return { containerRef, projectsRef, scrollVelocity };
}
