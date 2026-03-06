import { ArrowUpRight, Download, Mail } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { getLocalizedText } from '../lib/content';

function ContactSection({ contact, locale }) {
  return (
    <section className="section-shell" id="contact">
      <SectionHeading
        eyebrow={contact.eyebrow ?? contact.title}
        title={contact.sectionTitle ?? contact.title}
        description={contact.description}
        locale={locale}
      />

      <div className="contact-section-grid">
        <div className="contact-section-card card">
          <div className="contact-section-card__header">
            <Mail size={20} />
            <h3>{getLocalizedText(contact.title, locale)}</h3>
          </div>

          <dl className="contact-list">
            {contact.channels.map((channel) => (
              <div key={channel.id} className="contact-list__item">
                <dt>{getLocalizedText(channel.label, locale)}</dt>
                <dd>{channel.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="contact-section-card contact-section-card--accent card">
          <p>{getLocalizedText(contact.cardDescription ?? contact.description, locale)}</p>
          <div className="contact-section-card__actions">
            <a className="cta-button cta-button--primary" href={`mailto:${contact.email}`}>
              <span>{getLocalizedText(contact.primaryCta, locale)}</span>
              <ArrowUpRight size={18} />
            </a>
            <a
              className="cta-button cta-button--ghost"
              href={getLocalizedText(contact.resume.href, locale)}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={18} />
              <span>{getLocalizedText(contact.resume.label, locale)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
