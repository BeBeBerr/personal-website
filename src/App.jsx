import { useEffect, useMemo } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LoadingScreen from './components/LoadingScreen';
import SecondaryPagesSection from './components/SecondaryPagesSection';
import SignalStrip from './components/SignalStrip';
import TimelineSection from './components/TimelineSection';
import { getLocalizedText } from './lib/content';
import { useSitePage } from './lib/useSitePage';

const sectionIds = ['home', 'about', 'timeline', 'contact'];

function App() {
  const { content, locale, activeSection, isCondensed, headerRef, onLanguageToggle } = useSitePage({
    sectionIds,
  });

  useEffect(() => {
    fetch('https://api.luyuan.wang/visit/record').catch(() => {
      //
    });
  }, []);

  const pageLinks = useMemo(() => {
    if (!content) {
      return [];
    }

    return [
      { href: '/papers/', label: content.pageLinks.papers, icon: 'papers' },
      { href: '/projects/', label: content.pageLinks.projects, icon: 'projects' },
    ];
  }, [content]);

  const signalItems = useMemo(() => {
    if (!content) {
      return [];
    }

    return content.signalStrip.items.map((item) => getLocalizedText(item, locale));
  }, [content, locale]);

  if (!content) {
    return <LoadingScreen message="Loading portfolio..." />;
  }

  return (
    <div className="page-shell">
      <div className="page-noise" aria-hidden="true" />
      <Header
        ref={headerRef}
        navigation={content.navigation}
        locale={locale}
        activeSection={activeSection}
        onLanguageToggle={onLanguageToggle}
        languageToggle={content.ui.languageToggle}
        pageLinks={pageLinks}
        isCondensed={isCondensed}
      />

      <main className="page-content page-content--home">
        <HeroSection hero={content.hero} socialLinks={content.socialLinks} locale={locale} />
        <AboutSection about={content.about} contact={content.contact} locale={locale} />
        <TimelineSection timeline={content.timeline} locale={locale} />
        <SecondaryPagesSection pages={content.secondaryPages} locale={locale} />
        <ContactSection contact={content.contact} locale={locale} />
        <SignalStrip items={signalItems} />
      </main>

      <Footer footer={content.footer} socialLinks={content.socialLinks} locale={locale} />
    </div>
  );
}

export default App;
