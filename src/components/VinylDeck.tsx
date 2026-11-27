"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type Ref } from "react";
import styles from "./VinylDeck.module.css";

const rotationDuration = 8000;
const speedTransitionDuration = 320;

function useRecordRotation(playing: boolean) {
  const recordRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const speedRef = useRef(0);

  useEffect(() => {
    const record = recordRef.current;
    if (!record?.animate) return;

    const animation = record.animate(
      [{ transform: "rotate(0turn)" }, { transform: "rotate(1turn)" }],
      { duration: rotationDuration, iterations: Infinity },
    );
    animation.pause();
    animation.currentTime = 0;
    animation.updatePlaybackRate(0);
    animationRef.current = animation;
    speedRef.current = 0;

    return () => animation.cancel();
  }, []);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateRotation = () => {
      window.cancelAnimationFrame(frame);

      if (reducedMotion.matches || document.hidden) {
        speedRef.current = 0;
        animation.updatePlaybackRate(0);
        animation.pause();
        return;
      }

      const initialSpeed = speedRef.current;
      const targetSpeed = playing ? 1 : 0;
      if (initialSpeed === targetSpeed) return;

      const start = performance.now();
      animation.play();

      const easeRotation = (time: number) => {
        const progress = Math.min(
          Math.max((time - start) / speedTransitionDuration, 0),
          1,
        );
        const eased = progress * progress * (3 - 2 * progress);
        speedRef.current = initialSpeed + (targetSpeed - initialSpeed) * eased;
        animation.updatePlaybackRate(speedRef.current);

        if (progress < 1) {
          frame = window.requestAnimationFrame(easeRotation);
        } else if (!playing) {
          animation.pause();
        }
      };

      frame = window.requestAnimationFrame(easeRotation);
    };

    updateRotation();
    reducedMotion.addEventListener("change", updateRotation);
    document.addEventListener("visibilitychange", updateRotation);
    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", updateRotation);
      document.removeEventListener("visibilitychange", updateRotation);
    };
  }, [playing]);

  return recordRef;
}

function RecordArtwork({ src }: { src: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">(
    "loading",
  );
  if (status === "failed") return null;

  return (
    <Image
      alt=""
      src={src}
      width={240}
      height={240}
      unoptimized
      className={styles.artwork}
      data-loaded={status === "loaded"}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("failed")}
    />
  );
}

export function VinylRecord({
  playing,
  artwork,
  className,
  recordRef,
}: {
  playing: boolean;
  artwork?: string;
  className?: string;
  recordRef?: Ref<HTMLDivElement>;
}) {
  const rotorRef = useRecordRotation(playing);

  return (
    <div
      ref={recordRef}
      className={className ? `${styles.record} ${className}` : styles.record}
      data-vinyl-record
      aria-hidden="true"
    >
      <div className={styles.rotor} data-vinyl-rotor ref={rotorRef}>
        <div className={styles.grooves} />
        <div className={styles.label}>
          {artwork && <RecordArtwork key={artwork} src={artwork} />}
        </div>
      </div>
      <div className={styles.sheen} />
      <span className={styles.spindle} />
    </div>
  );
}

export function VinylDeck({
  playing,
  artwork,
  armPosition = playing ? "contact" : "rest",
  indicatorOn = playing,
  departing = false,
  recordRef,
}: {
  playing: boolean;
  artwork?: string;
  armPosition?: "rest" | "hover" | "contact";
  indicatorOn?: boolean;
  departing?: boolean;
  recordRef?: Ref<HTMLDivElement>;
}) {
  const metal = `${useId()}-metal`;

  return (
    <div
      className={styles.deck}
      data-arm={armPosition}
      data-audio={indicatorOn}
      data-departing={departing}
      aria-hidden="true"
    >
      <div className={styles.chassis} />
      <div className={styles.platter}>
        <VinylRecord
          playing={playing}
          artwork={artwork}
          className={styles.mountedRecord}
          recordRef={recordRef}
        />
      </div>
      <span className={styles.pivotPlate} />
      <span className={styles.armRest} />
      <div className={styles.arm}>
        <svg viewBox="0 0 420 310" fill="none" focusable="false">
          <defs>
            <linearGradient
              id={metal}
              x1="325"
              y1="0"
              x2="353"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#424449" />
              <stop offset=".45" stopColor="#d1d4d2" />
              <stop offset=".7" stopColor="#929b9d" />
              <stop offset="1" stopColor="#454b50" />
            </linearGradient>
          </defs>
          <rect
            x="331"
            y="38"
            width="20"
            height="28"
            rx="4"
            fill="#25292c"
            stroke="#111316"
          />
          <rect
            x="329"
            y="38"
            width="24"
            height="19"
            rx="4"
            fill={`url(#${metal})`}
          />
          <path
            d="M331 42h20m-20 4h20m-20 4h20"
            stroke="#151a1b"
            strokeOpacity=".42"
          />
          <path
            d="M341 68v103c0 25 5 29 5 55v13"
            stroke="#25292c"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M341 68v103c0 25 5 29 5 55v13"
            stroke={`url(#${metal})`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M339 69v102c0 25 5 29 5 55v12"
            stroke="#e0e3e2"
            strokeOpacity=".5"
            strokeWidth="1"
          />
          <circle
            cx="341"
            cy="68"
            r="13"
            fill="#17191c"
            stroke="#686c6f"
            strokeWidth="1.5"
          />
          <circle
            cx="341"
            cy="68"
            r="8"
            fill={`url(#${metal})`}
            stroke="#282b2f"
          />
          <circle cx="341" cy="68" r="2" fill="#3d4141" />
          <path
            d="M337 236h15l3 19-4 6h-15l-2-7z"
            fill="#202225"
            stroke="#71787b"
          />
          <path d="M337 252h15l-2 8h-13z" fill="#111214" />
          <path d="M340 243h9m-9 3h9" stroke="#828789" />
          <path
            d="M355 250h10v-5"
            stroke="#9ca2a0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M342 261h6l-3 5z" fill="#c7c7bc" />
        </svg>
      </div>
      <span className={styles.indicator} />
    </div>
  );
}
