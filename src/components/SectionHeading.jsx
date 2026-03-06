import { getLocalizedText } from '../lib/content';

function SectionHeading({ eyebrow, title, description, locale }) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="section-heading__eyebrow">{getLocalizedText(eyebrow, locale)}</p> : null}
      <h2 className="section-heading__title">{getLocalizedText(title, locale)}</h2>
      {description ? <p className="section-heading__description">{getLocalizedText(description, locale)}</p> : null}
    </div>
  );
}

export default SectionHeading;
