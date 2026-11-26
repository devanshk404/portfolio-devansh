"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  angle: number;
  targetAngle: number;
  turnIn: number;
  speed: number;
  radius: number;
  opacity: number;
};

// Decorative only: keep the density, speed, and connection count deliberately small.
const AREA_PER_DOT = 17_000;
const MAX_DOTS = 100;
const CONNECTION_RADIUS = 185;
const MAX_CONNECTIONS = 6;
const FRAME_INTERVAL = 1000 / 30;

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let width = 0;
    let height = 0;
    let canvasLeft = 0;
    let canvasTop = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let cursorOpacity = 0;
    const cursor = { x: 0, y: 0, active: false };

    function makeParticle(): Particle {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        angle,
        targetAngle: angle,
        turnIn: 1 + Math.random() * 5,
        speed: 7 + Math.random() * 11,
        radius: 0.8 + Math.random() * 0.9,
        opacity: 0.24 + Math.random() * 0.28,
      };
    }

    function draw(delta: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        cursorOpacity +=
          ((cursor.active ? 1 : 0) - cursorOpacity) *
          (1 - Math.exp(-delta * 12));

        for (const dot of particles) {
          dot.turnIn -= delta;
          if (dot.turnIn <= 0) {
            dot.targetAngle = dot.angle + (Math.random() - 0.5) * 1.8;
            dot.turnIn = 2 + Math.random() * 5;
          }
          dot.angle += (dot.targetAngle - dot.angle) * delta * 0.65;
          dot.x += Math.cos(dot.angle) * dot.speed * delta;
          dot.y += Math.sin(dot.angle) * dot.speed * delta;

          if (dot.x < dot.radius || dot.x > width - dot.radius) {
            dot.x = Math.max(dot.radius, Math.min(width - dot.radius, dot.x));
            dot.angle = Math.PI - dot.angle;
            dot.targetAngle = Math.PI - dot.targetAngle;
          }
          if (dot.y < dot.radius || dot.y > height - dot.radius) {
            dot.y = Math.max(dot.radius, Math.min(height - dot.radius, dot.y));
            dot.angle = -dot.angle;
            dot.targetAngle = -dot.targetAngle;
          }
        }
      }

      // Every line terminates at the actual client-space cursor tip, without smoothing its position.
      if (!reducedMotion && cursorOpacity > 0.005) {
        const nearby = particles
          .map((dot) => ({
            dot,
            distance: Math.hypot(dot.x - cursor.x, dot.y - cursor.y),
          }))
          .filter(({ distance }) => distance < CONNECTION_RADIUS)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, MAX_CONNECTIONS);

        context.lineWidth = 0.65;
        for (const { dot, distance } of nearby) {
          const strength = 1 - distance / CONNECTION_RADIUS;
          context.strokeStyle = `rgba(160, 187, 244, ${strength * strength * 0.24 * cursorOpacity})`;
          context.beginPath();
          context.moveTo(dot.x, dot.y);
          context.lineTo(cursor.x, cursor.y);
          context.stroke();
        }
      }

      for (const dot of particles) {
        const proximity =
          !reducedMotion && cursorOpacity > 0.005
            ? Math.max(
                0,
                1 -
                  Math.hypot(dot.x - cursor.x, dot.y - cursor.y) /
                    CONNECTION_RADIUS,
              ) * cursorOpacity
            : 0;
        context.fillStyle = `rgba(243, 244, 239, ${dot.opacity + proximity * 0.24})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius + proximity * 0.3, 0, Math.PI * 2);
        context.fill();
      }
    }

    function animate(now: number) {
      if (document.hidden || reducedMotion) return;
      if (lastFrame === 0 || now - lastFrame >= FRAME_INTERVAL) {
        const delta =
          lastFrame === 0 ? 0 : Math.min((now - lastFrame) / 1000, 0.05);
        lastFrame = now;
        draw(delta);
      }
      frameId = window.requestAnimationFrame(animate);
    }

    function restart() {
      window.cancelAnimationFrame(frameId);
      lastFrame = 0;
      if (reducedMotion || document.hidden) {
        cursor.active = false;
        cursorOpacity = 0;
      }
      draw(0);
      if (!reducedMotion && !document.hidden) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    function resize() {
      if (!canvas || !context) return;
      const previousWidth = width;
      const previousHeight = height;
      // The fixed canvas excludes browser scrollbars; client-space pointer positions must too.
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvasLeft = bounds.left;
      canvasTop = bounds.top;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const dot of particles) {
        dot.x = (dot.x / previousWidth) * width;
        dot.y = (dot.y / previousHeight) * height;
      }
      const count = Math.min(
        MAX_DOTS,
        Math.max(24, Math.round((width * height) / AREA_PER_DOT)),
      );
      particles = particles.slice(0, count);
      while (particles.length < count) particles.push(makeParticle());
      restart();
    }

    function moveCursor(event: PointerEvent) {
      if (reducedMotion || event.pointerType !== "mouse") {
        cursor.active = false;
        return;
      }
      cursor.x = event.clientX - canvasLeft;
      cursor.y = event.clientY - canvasTop;
      cursor.active = true;
    }

    function clearCursor() {
      cursor.active = false;
    }

    function pointerOut(event: PointerEvent) {
      if (!event.relatedTarget) clearCursor();
    }

    function motionPreferenceChanged(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      restart();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerout", pointerOut, { passive: true });
    window.addEventListener("pointercancel", clearCursor, { passive: true });
    window.addEventListener("blur", clearCursor);
    document.addEventListener("visibilitychange", restart);
    motionQuery.addEventListener("change", motionPreferenceChanged);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerout", pointerOut);
      window.removeEventListener("pointercancel", clearCursor);
      window.removeEventListener("blur", clearCursor);
      document.removeEventListener("visibilitychange", restart);
      motionQuery.removeEventListener("change", motionPreferenceChanged);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="background-particles"
      aria-hidden="true"
    />
  );
}
