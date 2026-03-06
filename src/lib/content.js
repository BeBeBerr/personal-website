export function getLocalizedText(value, locale) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return value[locale] ?? value.en ?? value.zh ?? '';
}

export function getLocalizedArray(values, locale) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => getLocalizedText(value, locale))
    .filter(Boolean);
}

export function getProjectSummary(project, locale) {
  const detail = getLocalizedText(project.detail, locale);
  const [firstSentence] = detail.split(/(?<=[.!?。！？])\s+/u);
  return firstSentence || detail;
}
