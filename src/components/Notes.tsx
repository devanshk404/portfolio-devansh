"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { Dialog } from "@/components/Dialog";

export function Notes() {
  const [selected, setSelected] = useState<
    (typeof siteContent.notes)[number] | null
  >(null);
  return (
    <>
      <div className="notes-grid">
        {siteContent.notes.map((note, i) => (
          <button
            className="note-entry"
            key={note.slug}
            onClick={() => setSelected(note)}
          >
            <span className="eyebrow">
              NOTE_0{i + 1} <span className="draft-dot" /> {note.status}
            </span>
            <h3>{note.title}</h3>
            <p>{note.excerpt}</p>
            <span className="note-read">
              Read the thought <ArrowUpRight size={16} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        labelId="note-title"
      >
        {selected && (
          <article className="dialog-content note-article">
            <p className="eyebrow">THINGS ON MY MIND / EDITABLE DRAFT</p>
            <h2 id="note-title">{selected.title}</h2>
            {selected.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        )}
      </Dialog>
    </>
  );
}
