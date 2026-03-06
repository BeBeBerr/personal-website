import {
  Award,
  Briefcase,
  BriefcaseBusiness,
  CodeXml,
  FlaskConical,
  GraduationCap,
  NotebookPen,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedText } from '../lib/content';

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  research: FlaskConical,
  activities: BriefcaseBusiness,
  projects: NotebookPen,
  awards: Award,
  skills: CodeXml,
};

function BackgroundSection({ background, locale }) {
  return (
    <section className="section-shell" id="background">
      <SectionHeading
        eyebrow={background.eyebrow}
        title={background.title}
        description={background.description}
        locale={locale}
      />

      <div className="background-grid">
        {background.groups.map((group) => {
          const Icon = iconMap[group.id] ?? NotebookPen;

          return (
            <article key={group.id} className="background-card card">
              <div className="background-card__header">
                <div className="background-card__icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{getLocalizedText(group.title, locale)}</h3>
                  <p>{getLocalizedText(group.description, locale)}</p>
                </div>
              </div>

              <div className="background-card__items">
                {group.items.map((item) => (
                  <div key={`${item.title.en}-${item.period.en}`} className="background-item">
                    <div className="background-item__topline">
                      <div className="background-item__title-group">
                        {item.logo ? (
                          <img
                            className="background-item__logo"
                            src={item.logo.src}
                            alt={getLocalizedText(item.logo.alt, locale)}
                          />
                        ) : null}
                        <h4>{getLocalizedText(item.title, locale)}</h4>
                      </div>
                      <span>{getLocalizedText(item.period, locale)}</span>
                    </div>
                    <p>{getLocalizedText(item.detail, locale)}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default BackgroundSection;
