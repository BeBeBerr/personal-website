import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedText } from '../lib/content';

function PapersSection({ papers, locale }) {
  return (
    <section className="section-shell" id="papers">
      <SectionHeading
        eyebrow={papers.eyebrow}
        title={papers.title}
        description={papers.description}
        locale={locale}
      />

      <div className="papers-grid">
        {papers.items.map((paper) => (
          <article key={paper.title.en} className="paper-card card">
            <div className="paper-card__meta">
              <span>{paper.year}</span>
            </div>

            <h3>{getLocalizedText(paper.title, locale)}</h3>
            <p className="paper-card__authors">{paper.authors}</p>
            <p className="paper-card__venue">{paper.venue}</p>

            {paper.link ? (
              <a
                className="paper-card__link"
                href={paper.link}
                target="_blank"
                rel="noreferrer"
              >
                <span>{getLocalizedText(papers.linkLabel, locale)}</span>
                <ArrowUpRight size={16} />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default PapersSection;
