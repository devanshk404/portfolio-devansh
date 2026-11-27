import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight, Asterisk } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.client} — Selected work`,
    description: project.description,
    openGraph: {
      title: `${project.client} — Devansh Kaushik`,
      description: project.description,
      ...(siteConfig.url
        ? {
            images: [
              {
                url: new URL("/opengraph-image", siteConfig.url).toString(),
                width: 1200,
                height: 630,
                alt: "Devansh Kaushik — creative strategy, storytelling and technology",
              },
            ],
          }
        : {}),
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  const isDraft = project.isDraft !== false;
  const isPlaceholderImage = project.image.startsWith("/placeholders/");

  return (
    <main id="main-content" className="case-page page-shell">
      <header className="case-header">
        <Link className="text-link case-back" href="/#work">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Work(ing/ed)
        </Link>
        <div className="case-kicker eyebrow">
          <span>Case study / {project.number}</span>
          <span>{project.client}</span>
        </div>
        <h1 className="case-title">{project.title}</h1>
        <p className="case-lead">{project.description}</p>
        <dl className="case-meta">
          <div>
            <dt>Organization / project</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{project.categories.join(" / ")}</dd>
          </div>
        </dl>
        <a className="text-link case-read" href="#case-overview">
          The story so far <ArrowDown size={16} aria-hidden="true" />
        </a>
      </header>

      <figure className={`case-hero case-hero-${project.theme}`}>
        <Image
          src={project.image}
          alt={
            project.imageAlt ??
            (isPlaceholderImage
              ? `${project.client} — original editorial placeholder artwork; project media to be added`
              : `${project.client} — project artwork`)
          }
          width={1440}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <figcaption className="eyebrow">
          {isPlaceholderImage
            ? "Art direction placeholder / project media coming soon"
            : `${project.client} / Project artwork`}
        </figcaption>
      </figure>

      {isDraft ? (
        <aside className="case-draft" aria-label="Content status">
          <Asterisk size={22} aria-hidden="true" />
          <p>
            <strong>A work in documentation.</strong> This is an editable case
            study draft. Some media or details may still be pending, and
            unverified results are left open.
          </p>
        </aside>
      ) : null}

      <div className="case-body">
        <nav className="case-contents" aria-label="In this case study">
          <span className="eyebrow">On this page</span>
          <a href="#case-overview">01 / Overview</a>
          <a href="#case-challenge">02 / The challenge</a>
          <a href="#case-approach">03 / My approach</a>
          <a href="#case-execution">04 / Ideas & execution</a>
          <a href="#case-deliverables">05 / Deliverables</a>
          <a href="#case-impact">06 / Outcomes</a>
          <a href="#case-reflection">07 / Reflections</a>
        </nav>

        <div className="case-story">
          <section
            className="case-section"
            id="case-overview"
            aria-labelledby="overview-title"
          >
            <p className="section-label">01 / Setting the scene</p>
            <h2 id="overview-title">The overview.</h2>
            <p>{project.overview}</p>
          </section>

          <section
            className="case-section"
            id="case-challenge"
            aria-labelledby="challenge-title"
          >
            <p className="section-label">02 / The question</p>
            <h2 id="challenge-title">What needed figuring out.</h2>
            <p>{project.challenge}</p>
          </section>

          <section
            className="case-section"
            id="case-approach"
            aria-labelledby="approach-title"
          >
            <p className="section-label">03 / The thinking</p>
            <h2 id="approach-title">My approach.</h2>
            <ol className="case-numbered-list">
              {project.approach.map((item, itemIndex) => (
                <li key={item}>
                  <span className="eyebrow">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="case-section"
            id="case-execution"
            aria-labelledby="execution-title"
          >
            <p className="section-label">04 / From idea to internet</p>
            <h2 id="execution-title">Ideas & execution.</h2>
            {project.execution.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {project.campaigns.length > 0 ? (
              <div className="case-campaigns">
                <h3>
                  {isDraft
                    ? "Ideas & campaigns to document"
                    : "Selected ideas & campaigns"}
                </h3>
                {isDraft ? (
                  <p className="muted">
                    Selected context from the brief. Individual contributions
                    and assets are pending documentation.
                  </p>
                ) : null}
                <ul>
                  {project.campaigns.map((campaign) => (
                    <li key={campaign}>{campaign}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section
            className="case-section"
            id="case-deliverables"
            aria-labelledby="deliverables-title"
          >
            <p className="section-label">05 / The work itself</p>
            <h2 id="deliverables-title">Selected visuals & deliverables.</h2>
            {isDraft ? (
              <p className="muted">
                A space for the actual work: screenshots, films, concepts, and
                the thinking behind them.
              </p>
            ) : null}
            <ul className="case-deliverables">
              {project.deliverables.map((deliverable, deliverableIndex) => (
                <li key={deliverable}>
                  <span className="eyebrow">
                    {String(deliverableIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{deliverable}</span>
                  {isDraft ? (
                    <span className="case-pending eyebrow">Media pending</span>
                  ) : null}
                </li>
              ))}
            </ul>
            {project.media && project.media.length > 0 ? (
              <div className="case-media-gallery">
                {project.media.map((media) => (
                  <figure className="case-media-item" key={media.src}>
                    {media.type === "video" ? (
                      <video
                        src={media.src}
                        poster={media.poster}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={media.alt}
                      />
                    ) : (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    )}
                    <figcaption>{media.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </section>

          <section
            className="case-section case-impact"
            id="case-impact"
            aria-labelledby="impact-title"
          >
            <p className="section-label">06 / What changed</p>
            <h2 id="impact-title">Outcomes, with context.</h2>
            <p>{project.outcomes}</p>
          </section>

          <section
            className="case-section"
            id="case-reflection"
            aria-labelledby="reflection-title"
          >
            <p className="section-label">07 / Looking back</p>
            <h2 id="reflection-title">Notes to take forward.</h2>
            <p>{project.reflection}</p>
          </section>
        </div>
      </div>

      <Link className="case-next" href={`/work/${nextProject.slug}`}>
        <div>
          <span className="eyebrow">
            Next in the collection / {nextProject.number}
          </span>
          <h2>{nextProject.client}</h2>
          <p>{nextProject.title}</p>
        </div>
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </main>
  );
}
