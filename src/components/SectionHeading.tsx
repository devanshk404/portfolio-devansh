export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number?: string;
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      {label && (
        <div className="section-kicker eyebrow">
          <span>{number ? `${number} / ${label}` : label}</span>
          <span aria-hidden="true">↘</span>
        </div>
      )}
      <div className="section-heading-row">
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
    </div>
  );
}
