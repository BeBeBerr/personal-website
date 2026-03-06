import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import PapersSection from './components/PapersSection';
import SectionHeading from './components/SectionHeading';
import { getLocalizedText } from './lib/content';
import { useSitePage } from './lib/useSitePage';

const sectionIds = ['papers-home', 'papers', 'contact'];
const buildPapersTitle = (content, locale) =>
  `${getLocalizedText(content.paperPage.title, locale)} | ${getLocalizedText(content.site.title, locale)}`;

function PapersApp() {
  const { content, locale, activeSection, isCondensed, headerRef, onLanguageToggle } = useSitePage({
    sectionIds,
    buildTitle: buildPapersTitle,
  });

  if (!content) {
    return <LoadingScreen message="Loading papers..." />;
  }

  return (
    <div className="page-shell">
      <div className="page-noise" aria-hidden="true" />
      <Header
        ref={headerRef}
        navigation={content.paperNavigation}
        locale={locale}
        activeSection={activeSection}
        onLanguageToggle={onLanguageToggle}
        languageToggle={content.ui.languageToggle}
        isCondensed={isCondensed}
      />

      <main className="page-content page-content--subpage">
        <section className="section-shell subpage-hero" id="papers-home">
          <SectionHeading
            eyebrow={content.paperPage.eyebrow}
            title={content.paperPage.title}
            description={content.paperPage.description}
            locale={locale}
          />
        </section>

        <PapersSection papers={content.papers} locale={locale} />
        <ContactSection contact={content.contact} locale={locale} />
      </main>

      <Footer footer={content.footer} socialLinks={content.socialLinks} locale={locale} />
    </div>
  );
}

export default PapersApp;
