import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/data/siteContent";

export function Contact() {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email)
    ? siteConfig.email
    : "";
  return (
    <footer id="contact" className="contact-section">
      <div className="page-shell">
        <div className="section-kicker eyebrow">
          <span>07 / START A CONVERSATION</span>
          <span>INDIA ↗ EVERYWHERE</span>
        </div>
        <div className="contact-main">
          <h2>
            {siteContent.contact.heading}
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
          </h2>
          <div>
            <p>{siteContent.contact.description}</p>
            {email ? (
              <a className="button button-primary" href={`mailto:${email}`}>
                Let’s talk <ArrowUpRight size={18} />
              </a>
            ) : (
              <span className="contact-pending">
                <Mail size={17} /> Email coming soon
              </span>
            )}
          </div>
        </div>
        <div className="social-links">
          {siteConfig.socials.map((social) =>
            social.href ? (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                key={social.label}
                className="unconfigured"
                title="Link will be added soon"
              >
                {social.label}
                <span className="eyebrow">SOON</span>
              </span>
            ),
          )}
          {siteConfig.resumeUrl ? (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="unconfigured">
              Résumé<span className="eyebrow">SOON</span>
            </span>
          )}
        </div>
        <div className="footer-bottom eyebrow">
          <span>© {new Date().getFullYear()} DEVANSH KAUSHIK</span>
          <span>BUILT WITH INTENT. AND A FEW TOO MANY TABS.</span>
          <Link href="/#home" aria-label="Back to top">
            BACK TO TOP <ArrowUp size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
