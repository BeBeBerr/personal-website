import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedText, getProjectSummary } from '../lib/content';

function ProjectsSection({ projects, locale }) {
  return (
    <section className="section-shell" id="projects">
      <SectionHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        description={projects.description}
        locale={locale}
      />

      <div className="projects-grid">
        {projects.items.map((project) => (
          <article key={project.title.en} className="project-card card">
            <div className="project-card__media">
              <img src={project.image.src} alt={getLocalizedText(project.image.alt, locale)} />
            </div>

            <div className="project-card__body">
              <div className="project-card__meta">
                <span>{getLocalizedText(project.period, locale)}</span>
                <span>{getLocalizedText(project.kind, locale)}</span>
              </div>

              <h3>{getLocalizedText(project.title, locale)}</h3>
              <p className="project-card__summary">{getProjectSummary(project, locale)}</p>

              <details className="project-card__details">
                <summary>
                  <span>{getLocalizedText(project.moreLabel, locale)}</span>
                  <ArrowUpRight size={16} />
                </summary>
                <p>{getLocalizedText(project.detail, locale)}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
