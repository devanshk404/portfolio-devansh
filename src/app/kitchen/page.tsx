import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KitchenCollection } from "@/components/KitchenCollection";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: siteContent.lab.heading,
  description: siteContent.lab.description,
};

export default function KitchenPage() {
  return (
    <main id="main-content" className="page-shell section kitchen-page">
      <Link href="/#lab" className="text-link">
        <ArrowLeft size={16} aria-hidden="true" /> Back to home
      </Link>
      <h1>{siteContent.lab.heading}</h1>
      <p className="kitchen-page-intro">{siteContent.lab.description}</p>
      <KitchenCollection />
    </main>
  );
}
