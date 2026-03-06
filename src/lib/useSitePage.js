import { useEffect, useRef, useState, useTransition } from 'react';
import { getLocalizedText } from './content';
import { attachPageTracking } from './pageTracking';

const DATA_URL = '/data.json';
const LOCALE_STORAGE_KEY = 'preferred-locale';

export function useSitePage({ sectionIds, initialSection = sectionIds[0], buildTitle }) {
  const [content, setContent] = useState(null);
  const [locale, setLocale] = useState('en');
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isCondensed, setIsCondensed] = useState(false);
  const [, startTransition] = useTransition();
  const headerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    fetch(DATA_URL, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setContent(data);

        const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        const nextLocale = data.site.supportedLocales.includes(savedLocale)
          ? savedLocale
          : data.site.defaultLocale;

        setLocale(nextLocale);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!content) {
      return undefined;
    }

    return attachPageTracking({
      sectionIds,
      getHeaderOffset: () => headerRef.current?.getBoundingClientRect().height ?? 0,
      setActiveSection,
      setIsCondensed,
    });
  }, [content, sectionIds]);

  useEffect(() => {
    if (!headerRef.current) {
      return undefined;
    }

    const headerNode = headerRef.current;

    // Keep section offsets and the hero height synced with the live header size.
    const updateHeaderOffset = () => {
      const nextHeight = Math.ceil(headerNode.getBoundingClientRect().height + 20);
      document.documentElement.style.setProperty('--header-height', `${nextHeight}px`);
    };

    updateHeaderOffset();

    const resizeObserver = new ResizeObserver(updateHeaderOffset);
    resizeObserver.observe(headerNode);
    window.addEventListener('resize', updateHeaderOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderOffset);
    };
  }, [content]);

  useEffect(() => {
    if (!content) {
      return;
    }

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.title = buildTitle ? buildTitle(content, locale) : getLocalizedText(content.site.title, locale);
  }, [buildTitle, content, locale]);

  const onLanguageToggle = () => {
    startTransition(() => {
      setLocale((currentLocale) => (currentLocale === 'en' ? 'zh' : 'en'));
    });
  };

  return {
    activeSection,
    content,
    headerRef,
    isCondensed,
    locale,
    onLanguageToggle,
  };
}
