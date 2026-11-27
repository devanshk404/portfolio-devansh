"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  Disc3,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { VinylIntro } from "@/components/VinylIntro";
import { VinylRecord } from "@/components/VinylDeck";
import { useRecordAudio } from "@/components/useRecordAudio";
import styles from "./NavbarMusic.module.css";

const statusText = {
  unconfigured: "No tracks added yet",
  loading: "Loading audio…",
  ready: "Ready to play",
  blocked: "Press play to enable music",
  playing: "Now playing",
  paused: "Paused",
  error: "Audio unavailable",
};

export function NavbarMusic({ onToggle }: { onToggle: () => void }) {
  const music = useRecordAudio();
  const { track, playing, playRequested, muted, status, canSkip } = music;
  const artwork = track?.artwork;
  const blocked = status === "blocked";
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointerInside = useRef(false);
  const [mode, setMode] = useState<"closed" | "preview" | "pinned">("closed");
  const [failedArtwork, setFailedArtwork] = useState<string>();
  const panelId = useId();
  const open = mode !== "closed";

  useEffect(() => {
    if (!open) return;

    function onOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !root.current?.contains(event.target)
      ) {
        setMode("closed");
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      if (root.current?.contains(document.activeElement)) {
        event.preventDefault();
        trigger.current?.focus();
      }
      setMode("closed");
    }

    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <>
      <div
        className={styles.music}
        ref={root}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          pointerInside.current = true;
          setMode((current) => (current === "closed" ? "preview" : current));
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          pointerInside.current = false;
          if (!root.current?.contains(document.activeElement)) {
            setMode((current) => (current === "preview" ? "closed" : current));
          }
        }}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget) &&
            !pointerInside.current
          ) {
            setMode("closed");
          }
        }}
      >
        {blocked && (
          <button
            className={styles.enable}
            type="button"
            onClick={music.togglePlay}
          >
            <Play size={12} aria-hidden="true" /> Enable music
          </button>
        )}
        <button
          className={styles.trigger}
          ref={trigger}
          type="button"
          aria-label="Music controls"
          aria-expanded={open}
          aria-controls={panelId}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) {
              setMode((current) =>
                current === "closed" ? "preview" : current,
              );
            }
          }}
          onClick={() => {
            if (mode !== "pinned") onToggle();
            setMode((current) => (current === "pinned" ? "closed" : "pinned"));
          }}
        >
          <VinylRecord
            className={styles.record}
            artwork={artwork}
            playing={playing}
          />
        </button>

        <div className={styles.positioner} data-open={open} inert={!open}>
          <section
            id={panelId}
            className={styles.panel}
            aria-label="Music player"
          >
            <div className={styles.track} aria-live="polite" aria-atomic="true">
              <div className={styles.art} aria-hidden="true">
                <Disc3 size={22} />
                {artwork && failedArtwork !== artwork && (
                  <Image
                    src={artwork}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    onError={() => setFailedArtwork(artwork)}
                  />
                )}
              </div>
              <div className={styles.details}>
                {track && (
                  <p
                    className={`eyebrow ${styles.status}`}
                    data-playing={playing}
                  >
                    {statusText[status]}
                  </p>
                )}
                <p className={styles.title}>
                  {track?.title ?? statusText[status]}
                </p>
                {track?.artist && (
                  <p className={styles.artist}>{track.artist}</p>
                )}
              </div>
            </div>

            {track && (
              <div
                className={styles.controls}
                role="group"
                aria-label="Music playback"
              >
                <button
                  type="button"
                  aria-label="Previous track"
                  onClick={music.previous}
                  disabled={!canSkip}
                >
                  <SkipBack size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.play}
                  onClick={music.togglePlay}
                >
                  {playRequested ? (
                    <Pause size={15} aria-hidden="true" />
                  ) : (
                    <Play size={15} aria-hidden="true" />
                  )}
                  {playRequested ? "Pause" : blocked ? "Enable music" : "Play"}
                </button>
                <button
                  type="button"
                  aria-label="Next track"
                  onClick={music.next}
                  disabled={!canSkip}
                >
                  <SkipForward size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={muted ? "Unmute" : "Mute"}
                  onClick={music.toggleMute}
                >
                  {muted ? (
                    <VolumeX size={16} aria-hidden="true" />
                  ) : (
                    <Volume2 size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <VinylIntro artwork={artwork} playing={playing} targetRef={trigger} />
    </>
  );
}
