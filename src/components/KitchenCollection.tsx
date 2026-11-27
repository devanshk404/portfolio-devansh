"use client";

import { useId, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { kitchenVideos, type KitchenVideo } from "@/data/kitchenVideos";
import { notifyKitchenVideoIntent } from "@/lib/mediaPlayback";

const pageSize = 6;

function VideoCard({ video }: { video: KitchenVideo }) {
  const { poster, postUrl, title = "Video on X" } = video;
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <article className="kitchen-video">
      <a
        className="kitchen-preview"
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on X (opens in a new tab)`}
        onClick={notifyKitchenVideoIntent}
      >
        {poster && !posterFailed && (
          <Image
            src={poster}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 33vw"
            onError={() => setPosterFailed(true)}
          />
        )}
        <span className="kitchen-play"><Play size={19} aria-hidden="true" /></span>
      </a>
      <div className="kitchen-video-caption">
        <p>{title}</p>
      </div>
    </article>
  );
}

export function KitchenCollection({ carousel = false }: { carousel?: boolean }) {
  const trackId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const visibleVideos = carousel ? kitchenVideos : kitchenVideos.slice(0, visibleCount);

  function updateArrows() {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 1);
    setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!carousel || !track) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    return () => observer.disconnect();
  }, [carousel]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const first = track?.children[0];
    const second = track?.children[1];
    if (!track || !first || !second) return;
    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    track.scrollBy({ left: direction * step });
  }

  return (
    <div>
      {carousel && (
        <div className="kitchen-arrows">
          <button type="button" aria-label="Previous video" aria-controls={trackId} disabled={!canGoBack} onClick={() => move(-1)}>
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next video" aria-controls={trackId} disabled={!canGoForward} onClick={() => move(1)}>
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      )}
      <ul
        id={trackId}
        ref={trackRef}
        className={carousel ? "kitchen-carousel" : "kitchen-grid"}
        aria-label="Kitchen videos"
        onScroll={carousel ? updateArrows : undefined}
      >
        {visibleVideos.map((video) => (
          <li key={video.postUrl}>
            <VideoCard video={video} />
          </li>
        ))}
      </ul>
      {!carousel && visibleCount < kitchenVideos.length && (
        <button type="button" className="kitchen-button kitchen-more" aria-controls={trackId} onClick={() => setVisibleCount((count) => count + pageSize)}>
          Load more videos <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
