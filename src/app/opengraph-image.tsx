import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Devansh Kaushik — Strategy, stories & things for the internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Use the font shipped with Next so sharing-image builds never require a font CDN.
  const font = await readFile(
    join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#030407",
        padding: "64px",
        color: "#f3f4ef",
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span style={{ background: "#1558c9", padding: "8px 16px" }}>
          devansh /
        </span>
        <span style={{ color: "#d4ff24" }}>
          BASED IN INDIA / BUILT FOR THE INTERNET
        </span>
      </div>
      <div
        style={{
          fontSize: 80,
          lineHeight: 1.03,
          letterSpacing: -4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Studied engineering.</span>
        <span>Ended up making things</span>
        <span style={{ color: "#d4ff24" }}>for the internet.</span>
      </div>
      <span style={{ fontSize: 23 }}>
        CREATIVE STRATEGY / SOCIAL & GROWTH / STORYTELLING
      </span>
    </div>,
    {
      ...size,
      fonts: [{ name: "Geist", data: font, weight: 400, style: "normal" }],
    },
  );
}
