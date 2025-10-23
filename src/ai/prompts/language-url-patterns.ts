/**
 * Language-specific URL patterns for Blacklane sitemap
 *
 * Provides localized URL patterns for different languages to ensure
 * proper link generation in content.
 */

export const getLanguageUrlPatterns = (language: string): string => {
  return `LANGUAGE-SPECIFIC URL PATTERNS:
Based on the language code "${language}", use these localized URL patterns:

German (de):
- City pages: /de/staedte-[city-name]/
- Limousine service: /de/limousinenservice-[location]/
- Chauffeur service: /de/chauffeurservice-[location]/
- Airport transfers: /de/flughafentransfer-[city]/

French (fr):
- City pages: /fr/villes-[city-name]/
- Limousine service: /fr/service-vtc-[location]/
- Chauffeur service: /fr/chauffeur-prive-[location]/
- Airport transfers: /fr/transfert-aeroport-[city]/

English (en) and Spanish (es):
- City pages: /${language}/cities-[city-name]/
- Limousine service: /${language}/limousine-service-[location]/
- Chauffeur service: /${language}/chauffeur-service-[location]/
- Airport transfers: /${language}/airport-transfer-[city]/

Always use the correct localized URL pattern that matches the content language "${language}"`;
};
