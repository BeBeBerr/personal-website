import SectionHeading from './SectionHeading';
import { getLocalizedText } from '../lib/content';

const typeLabelMap = {
  work: { en: 'Work', zh: '工作' },
  education: { en: 'Education', zh: '教育' },
  research: { en: 'Research', zh: '科研' },
  activity: { en: 'Community', zh: '活动' },
};

function TimelineSection({ timeline, locale }) {
  return (
    <section className="section-shell" id="timeline">
      <SectionHeading
        eyebrow={timeline.eyebrow}
        title={timeline.title}
        description={timeline.description}
        locale={locale}
      />

      <div className="timeline">
        {[...timeline.items].reverse().map((item, index) => {
          const alignment = index % 2 === 0 ? 'left' : 'right';

          const entryCard = (
            <article className="timeline-entry card">
              <div className="timeline-entry__meta">
                <span className={`timeline-entry__type timeline-entry__type--${item.type}`}>
                  {getLocalizedText(typeLabelMap[item.type], locale)}
                </span>
                <span>{getLocalizedText(item.period, locale)}</span>
              </div>
              <div className="timeline-entry__title-group">
                {item.logo ? (
                  <img
                    className="timeline-entry__logo"
                    src={item.logo.src}
                    alt={getLocalizedText(item.logo.alt, locale)}
                  />
                ) : null}
                <h3>{getLocalizedText(item.org, locale)}</h3>
              </div>
              <p className="timeline-entry__role">{getLocalizedText(item.role, locale)}</p>
              <p>{getLocalizedText(item.description, locale)}</p>
            </article>
          );

          return (
            <div
              key={`${item.org.en}-${item.period.en}`}
              className={`timeline-row timeline-row--${alignment}`}
            >
              <div className="timeline-row__side timeline-row__side--left">
                {alignment === 'left' ? entryCard : null}
              </div>
              <div className="timeline-row__rail" aria-hidden="true">
                <span className={`timeline-row__dot timeline-row__dot--${item.type}`} />
              </div>
              <div className="timeline-row__side timeline-row__side--right">
                {alignment === 'right' ? entryCard : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TimelineSection;
