"use client";

import Lenis from "lenis";
import { useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const ITEM_HEIGHT = 100;
const GAP = 10;
const SCROLL_SPEED = 0.8;
const SMOOTHNESS = 0.06;

export function useInfiniteColumns(leftCount, rightCount, isModalOpen = false) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const targetScroll = useRef(150);
  const currentScroll = useRef(0);
  const previousScroll = useRef(0);

  const leftCycle = useRef(0);
  const rightCycle = useRef(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const isMobile = useRef(false);
  const scrollVelocity = useMotionValue(0);

  // Recalculo de dimensões em Resize
  useEffect(() => {
    let resizeTimer;

    const calculate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      isMobile.current = width <= 1024;

      if (isMobile.current) {
        const itemSize = width * 0.55 + GAP;
        leftCycle.current = leftCount * itemSize;
        rightCycle.current = rightCount * itemSize;
      } else {
        const itemSize = height * (ITEM_HEIGHT / 100) + GAP;
        leftCycle.current = leftCount * itemSize;
        rightCycle.current = rightCount * itemSize;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculate, 100);
    };

    calculate();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [leftCount, rightCount]);

  // Loop Principal de Animação e Scroll
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      autoRaf: false,
      virtualScroll: ({ deltaY, deltaX }) => {
        if (isModalOpen || isDragging.current) return false;
        const delta = isMobile.current ? deltaX || deltaY : deltaY;
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
      dragStartY.current = event.clientY;
      dragStartX.current = event.clientX;
      dragStartScroll.current = targetScroll.current;

      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    };

    const handlePointerMove = (event) => {
      if (!isDragging.current || isModalOpen) return;

      const delta = isMobile.current
        ? event.clientX - dragStartX.current
        : event.clientY - dragStartY.current;

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
    let prevLeftTransform = "";
    let prevRightTransform = "";

    const raf = (time) => {
      lenis.raf(time);

      if (!isModalOpen) {
        // Interpolação Linear (LERP)
        currentScroll.current +=
          (targetScroll.current - currentScroll.current) * SMOOTHNESS;

        const scroll = currentScroll.current;
        const velocity = scroll - previousScroll.current;
        previousScroll.current = scroll;

        const normalizedVelocity = Math.max(-1, Math.min(1, velocity * 0.15));
        scrollVelocity.set(normalizedVelocity);

        const lCycle = leftCycle.current;
        const rCycle = rightCycle.current;

        if (isMobile.current) {
          if (lCycle > 0 && leftRef.current) {
            const leftOffset = ((scroll % lCycle) + lCycle) % lCycle;
            const transform = `translate3d(${-lCycle + leftOffset}px, 0, 0)`;
            if (transform !== prevLeftTransform) {
              leftRef.current.style.transform = transform;
              prevLeftTransform = transform;
            }
          }

          if (rCycle > 0 && rightRef.current) {
            const rightOffset = ((-scroll % rCycle) + rCycle) % rCycle;
            const transform = `translate3d(${-rCycle + rightOffset}px, 0, 0)`;
            if (transform !== prevRightTransform) {
              rightRef.current.style.transform = transform;
              prevRightTransform = transform;
            }
          }
        } else {
          if (lCycle > 0 && leftRef.current) {
            const leftOffset = ((scroll % lCycle) + lCycle) % lCycle;
            const transform = `translate3d(0, ${-lCycle + leftOffset}px, 0)`;
            if (transform !== prevLeftTransform) {
              leftRef.current.style.transform = transform;
              prevLeftTransform = transform;
            }
          }

          if (rCycle > 0 && rightRef.current) {
            const rightOffset = ((-scroll % rCycle) + rCycle) % rCycle;
            const transform = `translate3d(0, ${-rCycle + rightOffset}px, 0)`;
            if (transform !== prevRightTransform) {
              rightRef.current.style.transform = transform;
              prevRightTransform = transform;
            }
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
  }, [leftCount, rightCount, isModalOpen, scrollVelocity]);

  return {
    containerRef,
    leftRef,
    rightRef,
    scrollVelocity,
  };
}
