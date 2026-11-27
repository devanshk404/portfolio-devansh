import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { experience } from "@/data/experience";
import { Portrait } from "@/components/Portrait";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { KitchenCollection } from "@/components/KitchenCollection";
import { Offscreen } from "@/components/Offscreen";
import { Notes } from "@/components/Notes";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main id="main-content">
      <section
        id="home"
        className="hero page-shell"
        aria-labelledby="hero-title"
      >
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">
              {siteContent.hero.headline.split(/(looking)/).map((part, index) =>
                part === "looking" ? (
                  <span className="hero-highlight" key={index}>{part}</span>
                ) : part,
              )}
            </h1>
            <div className="hero-bottom">
              <p className="hero-intro">{siteContent.hero.intro}</p>
              <p className="discipline-list eyebrow">
                {siteContent.hero.disciplines.join(" / ")}
              </p>
            </div>
          </div>
          <Portrait />
        </div>
      </section>

      <div id="work" className="brand-strip page-shell">
        <span className="eyebrow">Work(ing/ed)</span>
        {siteContent.brands.map((brand) => (
          <a key={brand.name} href={brand.href} target="_blank" rel="noreferrer">
            {brand.name}
          </a>
        ))}
      </div>

      <section id="lab" className="lab-section section" aria-label={siteContent.lab.heading}>
        <div className="page-shell">
          <Reveal className="kitchen-heading">
            <h2>{siteContent.lab.heading}</h2>
            <Link className="kitchen-view-all" href="/kitchen">
              View All <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <p>{siteContent.lab.description}</p>
          </Reveal>
          <KitchenCollection carousel />
        </div>
      </section>

      <section
        className="capabilities-section section page-shell"
        aria-label={siteContent.sectionCopy.capabilities.title}
      >
        <Reveal>
          <SectionHeading
            title={siteContent.sectionCopy.capabilities.title}
          />
        </Reveal>
        <div className="capability-list">
          {siteContent.capabilities.map((capability, i) => (
            <div className="capability-row" key={capability.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="section page-shell"
        aria-label="Experience"
      >
        <Reveal>
          <SectionHeading title={siteContent.sectionCopy.experience.title} />
        </Reveal>
        <div className="experience-list">
          {experience.map((entry) => (
            <article className="experience-row" key={entry.organization}>
              <div className="experience-position">
                <h3>{entry.organization}</h3>
                <p className="experience-role">{entry.role}</p>
              </div>
              <p className="experience-period">{entry.period}</p>
              <p className="experience-description">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>

      {siteConfig.showOffscreenAndNotes && (
        <>
          <section
            id="offscreen"
            className="section offscreen-section page-shell"
            aria-label="Offscreen"
          >
            <Reveal>
              <SectionHeading
                title={siteContent.offscreen.heading}
                description={siteContent.offscreen.description}
              />
            </Reveal>
            <Offscreen />
          </section>

          <section className="section notes-section page-shell" aria-label="Notes">
            <Reveal>
              <SectionHeading
                number="06"
                label="LOOSE THOUGHTS"
                title={siteContent.sectionCopy.notes.title}
                description={siteContent.sectionCopy.notes.description}
              />
            </Reveal>
            <Notes />
          </section>
        </>
      )}
    </main>
  );
}
