"use client";

import { useId, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { kitchenVideos, type KitchenVideo } from "@/data/kitchenVideos";
import { notifyKitchenVideoIntent } from "@/lib/mediaPlayback";

const pageSize = 6;
const carouselSpeed = 40; // Pixels per second.

function VideoCard({ video, duplicate = false }: { video: KitchenVideo; duplicate?: boolean }) {
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
        tabIndex={duplicate ? -1 : undefined}
        onMouseDown={duplicate ? (event) => event.preventDefault() : undefined}
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

function KitchenCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild;
    const duplicate = track.children.item(kitchenVideos.length);
    if (!first || !duplicate) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover)");
    let inView = false;
    let frame = 0;
    let lastTime = 0;
    let lastPosition = track.scrollLeft;
    let manualScrollUntil = 0;
    let remainder = 0;
    let loopWidth = 0;

    const measure = () => {
      loopWidth = Math.round(duplicate.getBoundingClientRect().left - first.getBoundingClientRect().left);
    };

    const move = (now: number) => {
      frame = window.requestAnimationFrame(move);
      const elapsed = lastTime ? Math.min(now - lastTime, 50) : 0;
      lastTime = now;
      const position = track.scrollLeft;

      if (position !== lastPosition) {
        // Let native scrolling and its momentum finish before resuming.
        manualScrollUntil = now + 500;
        lastPosition = position;
        remainder = 0;
      }

      if (
        loopWidth <= 0 ||
        now < manualScrollUntil ||
        track.matches(":active, :has(:focus-visible)") ||
        (canHover.matches && track.matches(":hover"))
      ) return;

      // Scroll offsets can round to whole pixels, so carry fractional movement forward.
      remainder += (elapsed * carouselSpeed) / 1000;
      const distance = Math.floor(remainder);
      if (!distance) return;
      remainder -= distance;
      track.scrollLeft = (position + distance) % loopWidth;
      lastPosition = track.scrollLeft;
    };

    function syncAnimation() {
      window.cancelAnimationFrame(frame);
      lastTime = 0;
      if (inView && !reducedMotion.matches) {
        measure();
        frame = window.requestAnimationFrame(move);
      }
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncAnimation();
    });
    visibilityObserver.observe(track);
    reducedMotion.addEventListener("change", syncAnimation);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reducedMotion.removeEventListener("change", syncAnimation);
    };
  }, []);

  return (
    <ul ref={trackRef} className="kitchen-carousel" aria-label="Kitchen videos">
      {kitchenVideos.map((video) => (
        <li key={video.postUrl}>
          <VideoCard video={video} />
        </li>
      ))}
      {kitchenVideos.slice(0, 3).map((video) => (
        <li key={`duplicate-${video.postUrl}`} aria-hidden="true">
          <VideoCard video={video} duplicate />
        </li>
      ))}
    </ul>
  );
}

export function KitchenCollection({ carousel = false }: { carousel?: boolean }) {
  const trackId = useId();
  const [visibleCount, setVisibleCount] = useState(pageSize);

  if (carousel) return <KitchenCarousel />;

  return (
    <div>
      <ul id={trackId} className="kitchen-grid" aria-label="Kitchen videos">
        {kitchenVideos.slice(0, visibleCount).map((video) => (
          <li key={video.postUrl}>
            <VideoCard video={video} />
          </li>
        ))}
      </ul>
      {visibleCount < kitchenVideos.length && (
        <button type="button" className="kitchen-button kitchen-more" aria-controls={trackId} onClick={() => setVisibleCount((count) => count + pageSize)}>
          Load more videos <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
