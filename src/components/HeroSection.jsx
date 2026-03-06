import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  Map,
  Sparkles,
} from 'lucide-react';
import { getLocalizedArray, getLocalizedText } from '../lib/content';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  blog: Globe,
  scholar: Sparkles,
  email: Mail,
};

function HeroSection({ hero, socialLinks, locale }) {
  const introParagraphs = getLocalizedArray(hero.intro, locale);

  return (
    <section className="hero-section" id="home">
      <div className="hero-panel">
        <div className="hero-copy">
          <div className="hero-copy__headline">
            <span className="hero-copy__line hero-copy__line--pair">
              <span>{getLocalizedText(hero.lead, locale)}</span>
              <span className="hero-copy__highlight hero-copy__highlight--pink">
                <span className="hero-copy__highlight-text">{getLocalizedText(hero.name, locale)}</span>
              </span>
            </span>
            <span className="hero-copy__line">{getLocalizedText(hero.roleLead, locale)}</span>
            <span className="hero-copy__line hero-copy__highlight hero-copy__highlight--blue">
              <span className="hero-copy__highlight-text">{getLocalizedText(hero.roleFocus, locale)}</span>
            </span>
          </div>
          <p className="hero-copy__eyebrow hero-copy__eyebrow--under">
            {getLocalizedText(hero.eyebrow, locale)}
          </p>
        </div>

        <div className="hero-card">
          <div className="hero-card__frame">
            <div className="hero-card__glow" />
            <img
              className="hero-card__portrait"
              src={hero.portrait.src}
              alt={getLocalizedText(hero.portrait.alt, locale)}
            />
          </div>

          <div className="hero-card__details card">
            <p className="hero-card__status">{getLocalizedText(hero.status, locale)}</p>
          </div>
        </div>
      </div>

      <div className="hero-details">
        <div className="hero-copy__intro">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="hero-copy__chips" aria-label="Highlights">
          {hero.chips.map((chip) => (
            <span key={chip.id} className={`hero-chip hero-chip--${chip.tone}`}>
              {getLocalizedText(chip.label, locale)}
            </span>
          ))}
        </div>

        <div className="hero-copy__actions">
          <a className="cta-button cta-button--primary" href={hero.primaryCta.href}>
            <span>{getLocalizedText(hero.primaryCta.label, locale)}</span>
            <ArrowRight size={18} />
          </a>
          <a
            className="cta-button cta-button--ghost"
            href={getLocalizedText(hero.secondaryCta.href, locale)}
          >
            <Download size={18} />
            <span>{getLocalizedText(hero.secondaryCta.label, locale)}</span>
          </a>
          <a
            className="cta-button cta-button--ghost"
            href={hero.visitorCta.href}
            target="_blank"
            rel="noreferrer"
          >
            <Map size={18} />
            <span>{getLocalizedText(hero.visitorCta.label, locale)}</span>
          </a>
        </div>

        <div className="hero-socials">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] ?? ArrowUpRight;
            return (
              <a
                key={link.id}
                className="hero-socials__item"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <Icon size={18} />
                <span>{getLocalizedText(link.label, locale)}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
