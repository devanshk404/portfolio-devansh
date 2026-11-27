import Link from "next/link";
import { ArrowUp, ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/data/siteContent";

export function Contact() {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email)
    ? siteConfig.email
    : "";
  const contactLinks = [
    {
      label: "X / Twitter",
      href: siteConfig.socials.x,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.488 3.24H4.3z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: siteConfig.socials.linkedin,
      icon: <Linkedin size={22} aria-hidden="true" />,
    },
    {
      label: "Email",
      href: email ? `mailto:${email}` : "",
      icon: <Mail size={22} aria-hidden="true" />,
    },
    {
      label: "Telegram",
      href: siteConfig.socials.telegram,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.085.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.12l-6.87 4.326-2.962-.924c-.644-.203-.658-.644.135-.954l11.57-4.461c.537-.194 1.006.13.832.941z" />
        </svg>
      ),
    },
  ].filter(({ href }) => href);
  const extraLinks = [
    { label: "GitHub", href: siteConfig.socials.github },
    { label: "Résumé", href: siteConfig.resumeUrl },
  ].filter(({ href }) => href);

  return (
    <footer id="contact" className="contact-section">
      <div className="page-shell">
        <div className="contact-main">
          <h2>{siteContent.contact.heading}</h2>
          <div>
            <p>{siteContent.contact.description}</p>
            <div className="contact-links">
              {contactLinks.map(({ label, href, icon }) => {
                const external = href.startsWith("https://");
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {extraLinks.length > 0 && (
          <div className="social-links">
            {extraLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
        <div className="footer-bottom eyebrow">
          <span>© {new Date().getFullYear()} DEVANSH KAUSHIK</span>
          <span lang="hi">कर्म ही धर्म है</span>
          <Link href="/#home" aria-label="Back to top">
            BACK TO TOP <ArrowUp size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
