"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import type { KitchenVideo } from "@/data/kitchenVideos";

type XWidgets = { ready: (callback: (api: { widgets: { load: (container: HTMLElement) => void } }) => void) => void };

export function XVideoPlayer({
  postUrl,
  title,
  media,
}: {
  postUrl: string;
  title: string;
  media: NonNullable<KitchenVideo["media"]>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const { width, height } = media;
  const unavailable = status === "unavailable";

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("unavailable"), 12000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    const container = host.current;
    const widget = (window as Window & { twttr?: XWidgets }).twttr;
    if (unavailable || !scriptReady || !container || !widget) return;

    const target = document.createElement("div");
    const markup = document.createElement("blockquote");
    markup.className = "twitter-video";
    // X Publish passes this option to its media-only display mode.
    markup.dataset.mediaMaxWidth = "560";
    markup.dataset.theme = "dark";
    markup.dataset.dnt = "true";
    const permalink = document.createElement("a");
    permalink.href = postUrl;
    permalink.textContent = "Watch on X";
    markup.append(permalink);
    target.append(markup);
    container.append(target);

    const observer = new ResizeObserver(() => {
      const frame = target.querySelector("iframe");
      if (!frame) return;

      const { width: frameWidth, height: frameHeight } = frame.getBoundingClientRect();
      // X letterboxes portrait videos in a square frame. The media itself keeps its native proportions.
      const expectedHeight = frameWidth * Math.min(height / width, 1);
      if (frameWidth > 0 && Math.abs(frameHeight - expectedHeight) <= 5) {
        frame.title = title;
        setStatus("ready");
        observer.disconnect();
      }
    });
    observer.observe(target);
    widget.ready(({ widgets }) => {
      if (target.isConnected) widgets.load(target);
    });

    return () => {
      observer.disconnect();
      target.remove();
    };
  }, [unavailable, scriptReady, postUrl, title, width, height]);

  if (unavailable) {
    return (
      <a className="kitchen-preview kitchen-fallback" href={postUrl} target="_blank" rel="noreferrer">
        Watch on X <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    );
  }

  return (
    <div className="kitchen-player">
      <Script
        src="https://platform.x.com/widgets.js"
        onReady={() => setScriptReady(true)}
        onError={() => setStatus("unavailable")}
      />
      {status === "loading" && <div className="kitchen-preview kitchen-fallback" role="status">Loading video…</div>}
      <div ref={host} className={status === "loading" ? "kitchen-player-pending" : undefined} />
    </div>
  );
}
