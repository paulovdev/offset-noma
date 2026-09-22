import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const smoothX = useSpring(x, { stiffness: 600, damping: 75 });
  const smoothY = useSpring(y, { stiffness: 600, damping: 75 });

  useEffect(() => {
    let hasMoved = false;

    const handleMouseMove = (e) => {
      if (!hasMoved) {
        x.set(e.clientX);
        y.set(e.clientY);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        hasMoved = true;
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, smoothX, smoothY]);

  return { x: smoothX, y: smoothY };
}
