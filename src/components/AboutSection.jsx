import { ArrowUpRight, Download, FileText } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedArray, getLocalizedText } from '../lib/content';

function AboutSection({ about, contact, locale }) {
  const paragraphs = getLocalizedArray(about.paragraphs, locale);

  return (
    <section className="section-shell" id="about">
      <SectionHeading
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
        locale={locale}
      />

      <div className="about-grid">
        <div className="about-story card">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="focus-grid">
            {about.focusCards.map((card) => (
              <article key={card.id} className={`focus-card focus-card--${card.tone}`}>
                <h3>{getLocalizedText(card.title, locale)}</h3>
                <p>{getLocalizedText(card.description, locale)}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="contact-card card">
          <div className="contact-card__header">
            <FileText size={20} />
            <h3>{getLocalizedText(contact.title, locale)}</h3>
          </div>
          <p>{getLocalizedText(contact.sidebarDescription ?? contact.description, locale)}</p>

          <dl className="contact-list">
            {contact.channels.map((channel) => (
              <div key={channel.id} className="contact-list__item">
                <dt>{getLocalizedText(channel.label, locale)}</dt>
                <dd>{channel.value}</dd>
              </div>
            ))}
          </dl>

          <div className="contact-card__actions">
            <a className="cta-button cta-button--primary" href={`mailto:${contact.email}`}>
              <span>{getLocalizedText(contact.primaryCta, locale)}</span>
              <ArrowUpRight size={18} />
            </a>
            <a className="cta-button cta-button--ghost" href={getLocalizedText(contact.resume.href, locale)}>
              <Download size={18} />
              <span>{getLocalizedText(contact.resume.label, locale)}</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default AboutSection;
