"use client";

import { useId, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { kitchenVideos, type KitchenVideo } from "@/data/kitchenVideos";
import { XVideoPlayer } from "@/components/XVideoPlayer";

const pageSize = 6;

function VideoCard({
  video,
  active,
  onToggle,
}: {
  video: KitchenVideo;
  active: boolean;
  onToggle: () => void;
}) {
  const { media, postUrl, showPostLink, title = "Video on X" } = video;
  const playerArea = useRef<HTMLDivElement>(null);
  const [posterFailed, setPosterFailed] = useState(false);

  function togglePlayer() {
    playerArea.current?.focus({ preventScroll: true });
    onToggle();
  }

  return (
    <article className="kitchen-video">
      <div ref={playerArea} className="kitchen-video-area" tabIndex={-1}>
        {media && active ? (
          <XVideoPlayer title={title} postUrl={postUrl} media={media} />
        ) : media ? (
          <button
            type="button"
            className="kitchen-preview"
            aria-label={`Load video: ${title}`}
            onClick={togglePlayer}
          >
            {media.poster && !posterFailed && (
              <Image
                src={media.poster}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 33vw"
                onError={() => setPosterFailed(true)}
              />
            )}
            <span className="kitchen-play"><Play size={19} aria-hidden="true" /></span>
          </button>
        ) : (
          <a className="kitchen-preview kitchen-fallback" href={postUrl} target="_blank" rel="noreferrer" aria-label={`Open on X: ${title}`}>
            Open on X <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="kitchen-video-caption">
        <p>{title}</p>
        <div className="kitchen-video-actions">
          {active && (
            <button type="button" className="text-link" onClick={togglePlayer}>
              Close player
            </button>
          )}
          {media && showPostLink !== false && (
            <a className="text-link" href={postUrl} target="_blank" rel="noreferrer" aria-label={`View original post: ${title}`}>
              Original post <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function KitchenCollection({ carousel = false }: { carousel?: boolean }) {
  const trackId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [activePost, setActivePost] = useState<string>();
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
            <VideoCard
              video={video}
              active={activePost === video.postUrl}
              onToggle={() => setActivePost((current) => current === video.postUrl ? undefined : video.postUrl)}
            />
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
