import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import { getLocalizedText } from '../lib/content';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  blog: Globe,
  email: Mail,
};

function Footer({ footer, socialLinks, locale }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__intro">
        <p className="site-footer__eyebrow">{getLocalizedText(footer.eyebrow, locale)}</p>
        <h2>{getLocalizedText(footer.title, locale)}</h2>
        <p>{getLocalizedText(footer.description, locale)}</p>
      </div>

      <div className="site-footer__links">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon] ?? Globe;
          return (
            <a
              key={link.id}
              className="site-footer__link"
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

      <div className="site-footer__bottom">
        <span>{getLocalizedText(footer.copyright, locale)}</span>
        <a href={footer.registration.href} target="_blank" rel="noreferrer">
          {footer.registration.value}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
