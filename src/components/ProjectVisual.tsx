import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const placeholder = project.image.startsWith("/placeholders/");
  return (
    <div className={`project-visual visual-${project.theme}`}>
      <Image
        src={project.image}
        alt={
          project.imageAlt ||
          `${project.client} — ${placeholder ? "illustrative artwork placeholder" : "selected project artwork"}`
        }
        fill
        priority={priority}
        sizes="(max-width: 800px) 100vw, (max-width: 1100px) 70vw, 780px"
      />
      <span className="visual-caption eyebrow">
        {placeholder ? "ARTWORK PLACEHOLDER" : "SELECTED WORK"} ·{" "}
        {project.client}
      </span>
    </div>
  );
}
