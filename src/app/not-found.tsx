import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="case-page case-not-found page-shell">
      <p className="eyebrow">An unexpected detour</p>
      <div className="case-error-number" aria-hidden="true">
        404<span>↗</span>
      </div>
      <h1>This idea isn’t here. Yet.</h1>
      <p className="muted">
        This page may have moved, or the link took a wrong turn. There are still
        a few interesting things back on the homepage.
      </p>
      <div className="case-error-actions">
        <Link className="button button-primary" href="/">
          Back to the internet corner <ArrowLeft size={17} aria-hidden="true" />
        </Link>
        <Link className="text-link" href="/#work">
          Work(ing/ed) <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
