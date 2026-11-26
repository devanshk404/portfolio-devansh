"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Headphones,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { interests, personalDetails } from "@/data/interests";
import { Dialog } from "@/components/Dialog";

function playlistId(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "open.spotify.com"
      ? (url.pathname.match(
          /^\/(?:intl-[a-z]+\/)?playlist\/([a-zA-Z0-9]{22})\/?$/,
        )?.[1] ?? null)
      : null;
  } catch {
    return null;
  }
}

export function Offscreen() {
  const [selected, setSelected] = useState<(typeof interests)[number] | null>(
    null,
  );
  const [loadMusic, setLoadMusic] = useState(false);
  const id = playlistId(siteConfig.spotifyPlaylistUrl);
  return (
    <>
      <div className="scrapbook">
        <div className="mixtape">
          <span className="mixtape-label eyebrow">
            <Headphones size={14} /> WHAT’S ON REPEAT
          </span>
          <div className="record-sleeve">
            <Image
              src="/placeholders/album.svg"
              alt="Original vinyl sleeve placeholder artwork"
              width={720}
              height={720}
              sizes="260px"
            />
          </div>
          <div className="mixtape-track">
            <h3>
              A little hip-hop.
              <br />A lot of repeat.
            </h3>
            <p className="eyebrow">
              {id ? "THE SOUNDTRACK" : "PLAYLIST COMING SOON"}
            </p>
          </div>
          <div className="music-controls">
            <span aria-hidden="true">
              <SkipBack size={17} />
            </span>
            <button
              disabled={!id}
              aria-label={
                id
                  ? loadMusic
                    ? "Hide Spotify playlist"
                    : "Load Spotify playlist"
                  : "Playback unavailable — playlist coming soon"
              }
              aria-expanded={id ? loadMusic : undefined}
              onClick={() => setLoadMusic(!loadMusic)}
            >
              <Play size={20} fill="currentColor" />
            </button>
            <span aria-hidden="true">
              <SkipForward size={17} />
            </span>
          </div>
          {id && loadMusic && (
            <iframe
              title="Devansh’s Spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${id}`}
              width="100%"
              height="352"
              loading="lazy"
              allow="encrypted-media; fullscreen; picture-in-picture"
              className="spotify-embed"
            />
          )}
        </div>
        {interests.map((interest, index) => (
          <button
            key={interest.id}
            className={`scrap scrap-${interest.id}`}
            onClick={() => setSelected(interest)}
            aria-label={`Open ${interest.title}`}
          >
            <div className="scrap-photo">
              <Image
                src={interest.image}
                alt={`${interest.title}${interest.image.startsWith("/placeholders/") ? " — illustrative placeholder" : ""}`}
                width={1000}
                height={800}
                sizes="(max-width: 600px) 85vw, 330px"
              />
              <ArrowUpRight className="scrap-arrow" size={19} />
            </div>
            <span className="scrap-caption">
              <span className="eyebrow">
                0{index + 1} / {interest.kind}
              </span>
              <strong>{interest.title}</strong>
            </span>
          </button>
        ))}
        <div className="paper-note">
          <span className="eyebrow">NOTE TO SELF ↴</span>
          <p>
            Stay interested.
            <br />
            Make interesting things.
          </p>
          <span className="note-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </div>
      <div className="personal-details">
        {personalDetails.map((detail) => (
          <p key={detail.label}>
            <span className="eyebrow">{detail.label}</span>
            <span>{detail.value}</span>
          </p>
        ))}
      </div>
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        labelId="interest-title"
      >
        {selected && (
          <>
            <div className="dialog-media">
              <Image
                src={selected.image}
                alt={
                  selected.title +
                  (selected.image.startsWith("/placeholders/")
                    ? " — illustrative placeholder"
                    : "")
                }
                width={1000}
                height={800}
                sizes="(max-width: 700px) 100vw, 800px"
              />
            </div>
            <div className="dialog-content">
              <p className="eyebrow">OFFSCREEN / {selected.kind}</p>
              <h2 id="interest-title">{selected.title}</h2>
              <p>{selected.caption}</p>
              {selected.image.startsWith("/placeholders/") && (
                <p className="muted">
                  A space for personal photographs, memories, and
                  recommendations. Original placeholder illustration for now.
                </p>
              )}
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
