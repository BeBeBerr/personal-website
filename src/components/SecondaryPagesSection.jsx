import { ArrowUpRight, FolderArchive, FlaskConical } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedText } from '../lib/content';

const iconMap = {
  projects: FolderArchive,
  papers: FlaskConical,
};

function SecondaryPagesSection({ pages, locale }) {
  return (
    <section className="section-shell" id="secondary-pages">
      <SectionHeading
        eyebrow={pages.eyebrow}
        title={pages.title}
        description={pages.description}
        locale={locale}
      />

      <div className="secondary-pages-grid">
        {pages.items.map((item) => {
          const Icon = iconMap[item.icon] ?? FolderArchive;

          return (
            <article key={item.id} className="secondary-page-card card">
              <div className="secondary-page-card__content">
                <div className="secondary-page-card__header">
                  <div className="secondary-page-card__icon">
                    <Icon size={20} />
                  </div>
                  <p className="secondary-page-card__eyebrow">{getLocalizedText(item.eyebrow, locale)}</p>
                </div>
                <h3>{getLocalizedText(item.title, locale)}</h3>
                <p>{getLocalizedText(item.description, locale)}</p>

                <div className="secondary-page-card__stats">
                  {item.stats.map((stat) => (
                    <div key={stat.id} className="secondary-page-card__stat">
                      <span className="secondary-page-card__value">{stat.value}</span>
                      <span className="secondary-page-card__label">
                        {getLocalizedText(stat.label, locale)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                className="cta-button cta-button--primary"
                href={item.cta.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{getLocalizedText(item.cta.label, locale)}</span>
                <ArrowUpRight size={18} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SecondaryPagesSection;
