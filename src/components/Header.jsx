import { forwardRef } from 'react';
import {
  ArrowUpRight,
  FolderArchive,
  FlaskConical,
  Languages,
} from 'lucide-react';
import { getLocalizedText } from '../lib/content';

const linkIconMap = {
  projects: FolderArchive,
  papers: FlaskConical,
};

const Header = forwardRef(function Header(
  {
    navigation,
    locale,
    activeSection,
    onLanguageToggle,
    languageToggle,
    pageLinks = [],
    isCondensed = false,
  },
  ref,
) {
  return (
    <header className={`site-header ${isCondensed ? 'site-header--condensed' : ''}`}>
      <div ref={ref} className="site-header__shell">
        <div className="site-header__cluster">
          <nav className="site-nav" aria-label="Primary">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
                  href={`#${item.id}`}
                >
                  {getLocalizedText(item.label, locale)}
                </a>
              );
            })}
          </nav>

          {pageLinks.map((pageLink) => {
            const Icon = linkIconMap[pageLink.icon] ?? ArrowUpRight;

            return (
              <a
                key={pageLink.href}
                className="site-header__page-link"
                href={pageLink.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={16} />
                <span>{getLocalizedText(pageLink.label, locale)}</span>
                <ArrowUpRight size={16} />
              </a>
            );
          })}
        </div>

        <div className="site-header__actions">
          <button className="language-toggle" type="button" onClick={onLanguageToggle}>
            <Languages size={18} />
            <span>{getLocalizedText(languageToggle, locale)}</span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
