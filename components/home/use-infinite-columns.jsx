"use client";

import Lenis from "lenis";
import { motionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const ITEM_HEIGHT = 60;
const GAP = 10;
const SCROLL_SPEED = 0.8;
const SMOOTHNESS = 0.04;

export function useInfiniteColumns(leftCount, rightCount, isModalOpen = false) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const targetScroll = useRef(0);
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

  const scrollVelocity = useRef(motionValue(0)).current;

  useEffect(() => {
    const calculate = () => {
      isMobile.current = window.innerWidth <= 1024;

      if (isMobile.current) {
        const itemWidth = window.innerWidth * 0.55;
        const itemSize = itemWidth + GAP;

        leftCycle.current = leftCount * itemSize;
        rightCycle.current = rightCount * itemSize;
      } else {
        const itemHeight = window.innerHeight * (ITEM_HEIGHT / 100);
        const itemSize = itemHeight + GAP;

        leftCycle.current = leftCount * itemSize;
        rightCycle.current = rightCount * itemSize;
      }
    };

    calculate();

    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("resize", calculate);
    };
  }, [leftCount, rightCount]);

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
      if (isModalOpen) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

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

      if (isMobile.current) {
        const delta = event.clientX - dragStartX.current;

        if (Math.abs(delta) > 5) {
          hasDragged.current = true;
        }

        targetScroll.current = dragStartScroll.current - delta;
      } else {
        const delta = event.clientY - dragStartY.current;

        if (Math.abs(delta) > 5) {
          hasDragged.current = true;
        }

        targetScroll.current = dragStartScroll.current - delta;
      }
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

    container?.addEventListener("pointerdown", handlePointerDown);
    container?.addEventListener("click", handleClick, true);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    let rafId;

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

        const leftCycleSize = leftCycle.current;
        const rightCycleSize = rightCycle.current;

        if (isMobile.current) {
          if (leftCycleSize > 0 && leftRef.current) {
            const leftOffset =
              ((scroll % leftCycleSize) + leftCycleSize) % leftCycleSize;

            leftRef.current.style.transform = `translate3d(${-leftCycleSize + leftOffset}px, 0, 0)`;
          }

          if (rightCycleSize > 0 && rightRef.current) {
            const rightOffset =
              ((-scroll % rightCycleSize) + rightCycleSize) % rightCycleSize;

            rightRef.current.style.transform = `translate3d(${-rightCycleSize + rightOffset}px, 0, 0)`;
          }
        } else {
          if (leftCycleSize > 0 && leftRef.current) {
            const leftOffset =
              ((scroll % leftCycleSize) + leftCycleSize) % leftCycleSize;

            leftRef.current.style.transform = `translate3d(0, ${-leftCycleSize + leftOffset}px, 0)`;
          }

          if (rightCycleSize > 0 && rightRef.current) {
            const rightOffset =
              ((-scroll % rightCycleSize) + rightCycleSize) % rightCycleSize;

            rightRef.current.style.transform = `translate3d(0, ${-rightCycleSize + rightOffset}px, 0)`;
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
