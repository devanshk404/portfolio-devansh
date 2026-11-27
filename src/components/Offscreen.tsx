"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { interests, personalDetails } from "@/data/interests";
import { Dialog } from "@/components/Dialog";

export function Offscreen() {
  const [selected, setSelected] = useState<(typeof interests)[number] | null>(
    null,
  );
  return (
    <>
      <div className="scrapbook">
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
