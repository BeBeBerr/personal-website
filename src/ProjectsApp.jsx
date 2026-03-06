import BackgroundSection from './components/BackgroundSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import ProjectsSection from './components/ProjectsSection';
import SectionHeading from './components/SectionHeading';
import { getLocalizedText } from './lib/content';
import { useSitePage } from './lib/useSitePage';

const sectionIds = ['projects-home', 'background', 'projects', 'contact'];
const buildProjectsTitle = (content, locale) =>
  `${getLocalizedText(content.projectPage.title, locale)} | ${getLocalizedText(content.site.title, locale)}`;

function ProjectsApp() {
  const { content, locale, activeSection, isCondensed, headerRef, onLanguageToggle } = useSitePage({
    sectionIds,
    buildTitle: buildProjectsTitle,
  });

  if (!content) {
    return <LoadingScreen message="Loading build archive..." />;
  }

  return (
    <div className="page-shell">
      <div className="page-noise" aria-hidden="true" />
      <Header
        ref={headerRef}
        navigation={content.projectNavigation}
        locale={locale}
        activeSection={activeSection}
        onLanguageToggle={onLanguageToggle}
        languageToggle={content.ui.languageToggle}
        isCondensed={isCondensed}
      />

      <main className="page-content page-content--subpage">
        <section className="section-shell subpage-hero" id="projects-home">
          <SectionHeading
            eyebrow={content.projectPage.eyebrow}
            title={content.projectPage.title}
            description={content.projectPage.description}
            locale={locale}
          />
        </section>

        <BackgroundSection background={content.background} locale={locale} />
        <ProjectsSection projects={content.projects} locale={locale} />
        <ContactSection contact={content.contact} locale={locale} />
      </main>

      <Footer footer={content.footer} socialLinks={content.socialLinks} locale={locale} />
    </div>
  );
}

export default ProjectsApp;
