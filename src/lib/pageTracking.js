export function attachPageTracking({ sectionIds, getHeaderOffset, setActiveSection, setIsCondensed }) {
  const update = () => {
    const scrollY = window.scrollY;
    const headerOffset = getHeaderOffset() || 0;
    const probe = scrollY + headerOffset + 56;

    let currentSection = sectionIds[0];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && element.offsetTop <= probe) {
        currentSection = id;
      }
    });

    setActiveSection(currentSection);
    setIsCondensed(scrollY > 28);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}
