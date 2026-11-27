"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { experiments, type Experiment } from "@/data/experiments";
import { Dialog } from "@/components/Dialog";

function ExperimentTile({
  item,
  index,
  onSelect,
}: {
  item: Experiment;
  index: number;
  onSelect: (item: Experiment) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const play = () => {
    if (!reduced) video.current?.play().catch(() => {});
  };
  const pause = () => video.current?.pause();
  return (
    <button
      className={`lab-tile lab-tile-${index + 1}`}
      onClick={() => onSelect(item)}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      aria-label={`Explore ${item.title}`}
    >
      <div className="lab-image">
        <Image
          src={item.image}
          alt={`${item.title}${item.image.startsWith("/placeholders/") ? " — concept artwork placeholder" : ""}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 500px"
        />
        {item.video && (
          <video
            ref={video}
            src={item.video}
            poster={item.image}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`Muted preview: ${item.title}`}
          />
        )}
        <span className="lab-open">
          {item.video ? <Play size={19} /> : <ArrowUpRight size={20} />}
        </span>
        <span className="lab-index eyebrow">
          EXP_{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="lab-tile-caption">
        <h3>{item.title}</h3>
        <span className="eyebrow">{item.type}</span>
      </div>
    </button>
  );
}

export function Lab() {
  const [selected, setSelected] = useState<Experiment | null>(null);
  return (
    <>
      <div className="lab-grid">
        {experiments.map((item, index) => (
          <ExperimentTile
            key={item.id}
            item={item}
            index={index}
            onSelect={setSelected}
          />
        ))}
      </div>
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        labelId="experiment-title"
      >
        {selected && (
          <>
            <div className="dialog-media">
              <Image
                src={selected.image}
                alt={`${selected.title}${selected.image.startsWith("/placeholders/") ? " — placeholder artwork" : ""}`}
                width={1200}
                height={800}
                sizes="(max-width: 700px) 100vw, 800px"
              />
              {selected.video && (
                <video
                  src={selected.video}
                  controls
                  playsInline
                  preload="metadata"
                  poster={selected.image}
                />
              )}
            </div>
            <div className="dialog-content">
              <p className="eyebrow">
                {selected.type} / {selected.status}
              </p>
              <h2 id="experiment-title">{selected.title}</h2>
              <p>{selected.concept}</p>
              <div className="dialog-notes">
                <h3>Behind the idea</h3>
                <p>{selected.notes}</p>
              </div>
              <div className="tags">
                {selected.tools.map((tool) => (
                  <span className="pill" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
