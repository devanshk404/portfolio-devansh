"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { VinylDeck } from "@/components/VinylDeck";
import styles from "./VinylIntro.module.css";

const sessionKey = "portfolio:vinyl-intro:v1";
let introSeenInDocument = false;

function takeIntro() {
  if (introSeenInDocument) return false;
  introSeenInDocument = true;

  try {
    if (sessionStorage.getItem(sessionKey)) return false;
    sessionStorage.setItem(sessionKey, "seen");
  } catch {
    // Some privacy settings disable storage. The current document still remembers the intro.
  }
  return true;
}

type Stage = "hidden" | "enter" | "hover" | "contact" | "spin" | "transfer";

export function VinylIntro({
  artwork,
  playing,
  targetRef,
}: {
  artwork?: string;
  playing: boolean;
  targetRef: RefObject<HTMLButtonElement | null>;
}) {
  const [stage, setStage] = useState<Stage>("hidden");
  const recordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];
    let target: HTMLButtonElement | null = null;
    let flight: Animation | undefined;

    function stop() {
      timers.forEach((timer) => window.clearTimeout(timer));
      flight?.cancel();
      target?.removeAttribute("data-vinyl-intro-target");
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("focusin", finish);
      document.removeEventListener("pointerdown", onPointerDown, true);
      reduceMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", finish);
    }

    function finish() {
      if (recordRef.current) recordRef.current.style.visibility = "hidden";
      stop();
      setStage("hidden");
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }

    function onPointerDown(event: PointerEvent) {
      const element = event.target;
      if (
        element instanceof Element &&
        element.closest(
          "a[href], button, input, select, textarea, summary, [role='button']",
        )
      ) {
        finish();
      }
    }

    function onVisibilityChange() {
      if (target && document.hidden) finish();
      else if (!target && !document.hidden) begin();
    }

    function onMotionChange() {
      if (reduceMotion.matches) finish();
    }

    function transfer() {
      const record = recordRef.current;
      const destination = target?.querySelector<HTMLElement>(
        "[data-vinyl-record]",
      );
      if (!record?.animate || !destination) return finish();

      const from = record.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      if (!from.width || !to.width) return finish();

      const x = to.left + to.width / 2 - (from.left + from.width / 2);
      const y = to.top + to.height / 2 - (from.top + from.height / 2);
      setStage("transfer");
      flight = record.animate(
        [
          { transform: "translate(0, 0) scale(1)" },
          {
            transform: `translate(${x}px, ${y}px) scale(${to.width / from.width})`,
          },
        ],
        {
          duration: 730,
          easing: "cubic-bezier(0.58, 0.03, 0.23, 1)",
          fill: "forwards",
        },
      );

      flight.onfinish = () => {
        const currentPhase = record
          .querySelector("[data-vinyl-rotor]")
          ?.getAnimations?.()[0]?.currentTime;
        const nextRotor = destination
          .querySelector("[data-vinyl-rotor]")
          ?.getAnimations?.()[0];
        if (nextRotor && currentPhase != null)
          nextRotor.currentTime = currentPhase;
        finish();
      };
    }

    function begin() {
      if (target || document.hidden) return;
      if (!takeIntro() || reduceMotion.matches || !targetRef.current)
        return finish();

      target = targetRef.current;
      target.setAttribute("data-vinyl-intro-target", "");
      setStage("enter");
      timers.push(
        window.setTimeout(() => setStage("hover"), 390),
        window.setTimeout(() => setStage("contact"), 1015),
        window.setTimeout(() => setStage("spin"), 1190),
        window.setTimeout(transfer, 1770),
      );

      document.addEventListener("keydown", onEscape);
      document.addEventListener("focusin", finish);
      document.addEventListener("pointerdown", onPointerDown, true);
      reduceMotion.addEventListener("change", onMotionChange);
      window.addEventListener("resize", finish);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    const start = window.requestAnimationFrame(begin);
    return () => {
      window.cancelAnimationFrame(start);
      stop();
    };
  }, [targetRef]);

  if (stage === "hidden") return null;

  return createPortal(
    <div className={styles.overlay} data-stage={stage}>
      <div className={styles.deck}>
        <VinylDeck
          recordRef={recordRef}
          artwork={artwork}
          playing={stage === "spin" || stage === "transfer"}
          armPosition={
            stage === "enter" ? "rest" : stage === "hover" ? "hover" : "contact"
          }
          indicatorOn={playing}
          departing={stage === "transfer"}
        />
      </div>
    </div>,
    document.body,
  );
}
