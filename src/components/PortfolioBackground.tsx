import { siteConfig } from "@/config/site";
import { BackgroundParticles } from "@/components/BackgroundParticles";

// Isolated, asset-replaceable interpretation of the charcoal grid / star-field reference.
export function PortfolioBackground() {
  return (
    <div className="portfolio-background" aria-hidden="true">
      {siteConfig.backgroundAsset ? (
        <div
          className="background-asset"
          style={{ backgroundImage: `url(${siteConfig.backgroundAsset})` }}
        />
      ) : (
        <>
          <div className="background-grid" />
          <BackgroundParticles />
          <div className="background-grain" />
        </>
      )}
    </div>
  );
}
