"use client";

import { useEffect, useRef, useState } from "react";
import { recordAudioConfig, type RecordTrack } from "@/config/recordAudio";
import { subscribeToKitchenVideoIntent } from "@/lib/mediaPlayback";

export type RecordAudioStatus = "unconfigured" | "loading" | "ready" | "blocked" | "playing" | "paused" | "error";

function readTracks(origin: string) {
  const ids = new Set<string>();
  const sources = new Set<string>();
  const tracks: RecordTrack[] = [];

  for (const track of recordAudioConfig.tracks) {
    if (!track.id.trim() || !track.title.trim() || ids.has(track.id)) continue;

    const source = track.src.trim();
    if (!source.startsWith("/") && !source.startsWith("https://")) continue;

    try {
      const url = new URL(source, origin);
      if (url.username || url.password || sources.has(url.href)) continue;
      if (source.startsWith("/") ? url.origin !== origin : url.protocol !== "https:") continue;

      ids.add(track.id);
      sources.add(url.href);
      tracks.push({ ...track, src: url.href });
    } catch {
      // Ignore malformed URLs in the optional audio catalog.
    }
  }

  return tracks;
}

export function useRecordAudio() {
  const controller = useRef<{
    togglePlay(): void;
    move(offset: -1 | 1): void;
    toggleMute(): void;
  } | null>(null);
  const [track, setTrack] = useState<RecordTrack | null>(null);
  const [status, setStatus] = useState<RecordAudioStatus>(recordAudioConfig.tracks.length ? "loading" : "unconfigured");
  const [playRequested, setPlayRequested] = useState(false);
  const [muted, setMuted] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!recordAudioConfig.tracks.length) return;

    const tracks = readTracks(window.location.origin);
    let disposed = false;
    if (!tracks.length) {
      queueMicrotask(() => {
        if (!disposed) setStatus("unconfigured");
      });
      return () => { disposed = true; };
    }

    const audio = new Audio();
    audio.volume = 0.1;
    audio.preload = "metadata";
    let index = -1;
    let playIntent = false;
    let kitchenOpened = false;
    let requestId = 0;

    function requestPlayback() {
      const request = ++requestId;
      playIntent = true;
      setPlayRequested(true);
      setStatus("loading");
      void audio.play().catch((error: unknown) => {
        if (disposed || request !== requestId) return;

        playIntent = false;
        setPlayRequested(false);
        setStatus(error instanceof DOMException && error.name === "NotAllowedError" ? "blocked" : "error");
      });
    }

    function select(next: number, autoplay: boolean) {
      requestId++;
      playIntent = false;
      audio.pause();
      index = next;
      const selection = tracks[index];
      audio.src = selection.src;
      setTrack(selection);
      setStatus("loading");
      if (autoplay) requestPlayback();
      else setPlayRequested(false);
    }

    function pause() {
      const wasActive = playIntent || !audio.paused;
      requestId++;
      playIntent = false;
      setPlayRequested(false);
      audio.pause();
      if (wasActive) setStatus("paused");
    }

    function handleKitchen() {
      kitchenOpened = true;
      pause();
    }

    function handleMetadata() {
      if (!playIntent) setStatus((previous) => previous === "loading" ? "ready" : previous);
    }

    function handlePlaying() {
      if (playIntent && !audio.paused) setStatus("playing");
    }

    function handleWaiting() {
      if (playIntent && !audio.paused) setStatus("loading");
    }

    function handlePause() {
      if (playIntent && audio.paused && !audio.ended) pause();
    }

    function handleEnded() {
      if (!audio.ended || !playIntent) return;

      if (tracks.length > 1) select((index + 1) % tracks.length, true);
      else pause();
    }

    function handleError() {
      if (!audio.error) return;

      requestId++;
      playIntent = false;
      setPlayRequested(false);
      setStatus("error");
    }

    function handleVolume() {
      setMuted(audio.muted);
    }

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("volumechange", handleVolume);
    const unsubscribe = subscribeToKitchenVideoIntent(handleKitchen);

    controller.current = {
      togglePlay() {
        if (index < 0) return;

        if (playIntent) pause();
        else if (audio.error) select(index, true);
        else requestPlayback();
      },
      move(offset) {
        if (index < 0 || tracks.length < 2) return;

        select((index + offset + tracks.length) % tracks.length, playIntent);
      },
      toggleMute() {
        audio.muted = !audio.muted;
      },
    };

    queueMicrotask(() => {
      if (disposed) return;

      setCanSkip(tracks.length > 1);
      select(Math.floor(Math.random() * tracks.length), recordAudioConfig.autoplay && !kitchenOpened);
    });

    return () => {
      disposed = true;
      controller.current = null;
      unsubscribe();
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("volumechange", handleVolume);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  return {
    track,
    status,
    playing: status === "playing",
    playRequested,
    muted,
    canSkip,
    togglePlay: () => controller.current?.togglePlay(),
    previous: () => controller.current?.move(-1),
    next: () => controller.current?.move(1),
    toggleMute: () => controller.current?.toggleMute(),
  };
}
