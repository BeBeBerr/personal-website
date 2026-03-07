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

const timelineDrivenGroups = new Set(['education', 'work', 'research']);

function getGroupItems(group, timelineItems) {
  if (!timelineDrivenGroups.has(group.id)) {
    return group.items ?? [];
  }

  // Keep education and work in one editable source by deriving these cards
  // directly from the home-page timeline entries.
  return [...timelineItems]
    .filter((item) => item.type === group.id)
    .reverse()
    .map((item) => ({
      title: item.org,
      period: item.period,
      role: item.role,
      detail: item.description,
      logo: item.logo,
    }));
}

function renderGroup(group, locale, timelineItems) {
  const Icon = iconMap[group.id] ?? NotebookPen;
  const items = getGroupItems(group, timelineItems);

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
        {items.map((item) => (
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
            {item.role ? (
              <p className="background-item__role">{getLocalizedText(item.role, locale)}</p>
            ) : null}
            <p>{getLocalizedText(item.detail, locale)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function getBackgroundColumns(groups) {
  const educationGroup = groups.find((group) => group.id === 'education');
  const workGroup = groups.find((group) => group.id === 'work');
  const remainingGroups = groups.filter((group) => group.id !== 'education' && group.id !== 'work');
  const leftColumn = educationGroup ? [educationGroup] : [];
  const rightColumn = workGroup ? [workGroup] : [];

  remainingGroups.forEach((group, index) => {
    if (index % 2 === 0) {
      leftColumn.push(group);
      return;
    }

    rightColumn.push(group);
  });

  return [leftColumn, rightColumn];
}

function BackgroundSection({ background, locale, timelineItems = [] }) {
  const [leftColumn, rightColumn] = getBackgroundColumns(background.groups);

  return (
    <section className="section-shell" id="background">
      <SectionHeading
        eyebrow={background.eyebrow}
        title={background.title}
        description={background.description}
        locale={locale}
      />

      <div className="background-columns">
        <div className="background-column">
          {leftColumn.map((group) => renderGroup(group, locale, timelineItems))}
        </div>
        <div className="background-column">
          {rightColumn.map((group) => renderGroup(group, locale, timelineItems))}
        </div>
      </div>
    </section>
  );
}

export default BackgroundSection;
