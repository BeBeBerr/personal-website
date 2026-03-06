import Footer from './components/Footer';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import SectionHeading from './components/SectionHeading';
import VisitorMapSection from './components/VisitorMapSection';
import { getLocalizedText } from './lib/content';
import { useSitePage } from './lib/useSitePage';

const sectionIds = ['visitor-home', 'contact'];
const buildVisitorTitle = (content, locale) =>
  `${getLocalizedText(content.visitorPage.title, locale)} | ${getLocalizedText(content.site.title, locale)}`;

function VisitorApp() {
  const { content, locale, activeSection, isCondensed, headerRef, onLanguageToggle } = useSitePage({
    sectionIds,
    buildTitle: buildVisitorTitle,
  });

  if (!content) {
    return <LoadingScreen message="Loading visitor map..." />;
  }

  return (
    <div className="page-shell">
      <div className="page-noise" aria-hidden="true" />
      <Header
        ref={headerRef}
        navigation={[
          { id: 'visitor-home', label: content.visitorPage.eyebrow },
          { id: 'contact', label: content.navigation.find((item) => item.id === 'contact')?.label ?? { en: 'Contact', zh: '联系' } },
        ]}
        locale={locale}
        activeSection={activeSection}
        onLanguageToggle={onLanguageToggle}
        languageToggle={content.ui.languageToggle}
        isCondensed={isCondensed}
      />

      <main className="page-content page-content--subpage">
        <section className="section-shell subpage-hero" id="visitor-home">
          <SectionHeading
            eyebrow={content.visitorPage.eyebrow}
            title={content.visitorPage.title}
            description={content.visitorPage.description}
            locale={locale}
          />
          <VisitorMapSection />
        </section>
      </main>

      <Footer footer={content.footer} socialLinks={content.socialLinks} locale={locale} />
    </div>
  );
}

export default VisitorApp;
