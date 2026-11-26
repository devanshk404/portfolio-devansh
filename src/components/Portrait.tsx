"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Portrait() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!flipped) return;

    const timeout = window.setTimeout(() => setFlipped(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [flipped]);

  return (
    <div className="hero-portrait-wrap">
      <figure className="hero-portrait">
        <div className="portrait-tape" aria-hidden="true" />
        <Image
          src={siteConfig.portrait}
          alt="An astronaut riding a horse"
          width={1024}
          height={1003}
          priority
          sizes="(max-width: 700px) 180px, 260px"
        />
        <figcaption>
          <span>{siteConfig.name.toUpperCase()}</span>
          <span className="eyebrow">wasting time efficiently</span>
        </figcaption>
      </figure>
      <button
        type="button"
        className="portrait-sticker"
        aria-label="Say hi"
        aria-pressed={flipped}
        onClick={() => setFlipped((current) => !current)}
      >
        <span className="portrait-sticker-flip" aria-hidden="true">
          <span className="portrait-sticker-face portrait-sticker-front">
            Say hi
          </span>
          <span className="portrait-sticker-face portrait-sticker-back">
            <Image
              src="/images/say-hi.gif"
              alt=""
              width={160}
              height={160}
              unoptimized
            />
          </span>
        </span>
      </button>
    </div>
  );
}
