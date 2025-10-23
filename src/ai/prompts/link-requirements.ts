/**
 * Link requirements and examples for AI content generation
 *
 * Contains strict rules for internal link generation including:
 * - Duplicate prevention
 * - Sitemap verification
 * - Link formatting examples
 */

import { LINK_CONFIG } from './constants';

export const getLinkRequirements = (
  language: string,
  mainKeywords: string,
): string => {
  return `Links: Include related Blacklane minimum ${LINK_CONFIG.MIN_INTERNAL_LINKS} unique links within the text by naturally placing them as anchor text.

CRITICAL LINK REQUIREMENTS:
- You MUST only use URLs that exist in the Blacklane sitemap. Before including any link, verify it exists at: ${LINK_CONFIG.SITEMAP_URL}
- ABSOLUTELY NO DUPLICATE LINKS - each URL can only be used ONCE across all content
- If you need to reference the same service/location again, use different anchor text but DO NOT repeat the same URL

Focus on URLs that match the language (${language}) and are relevant to the main keyword "${mainKeywords}".`;
};

export const LINK_FORMATTING_EXAMPLE = `
Example of proper link formatting:

Singapore is one of the most economically powerful countries in Asia and one of the world's busiest ports, making it a major destination for international business travelers. It's no surprise, then, that it's also [one of the best airports in the world](https://blog.blacklane.com/travel/airports/singapore-airport-the-best-in-the-world/). Getting into such a bustling city from the Changi Airport (SIN) can quickly become stressful, especially when working you're under the pressure of time constraints, but there's no need for your Singapore airport transfers to be difficult - consider an [alternative to a Singapore taxi](/en/singapore).`;
