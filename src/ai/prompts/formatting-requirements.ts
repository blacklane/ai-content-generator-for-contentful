/**
 * Formatting and SEO requirements for content generation
 *
 * Includes meta tags, character limits, and general formatting rules
 */

import { LINK_CONFIG, SEO_LIMITS, TEXT_CASE_EXAMPLES } from './constants';

export const getFormattingRequirements = (
  language: string,
  mainKeywords: string,
  secondaryKeywords: string,
): string => {
  return `Requirements:
- Meta title: Maximum ${SEO_LIMITS.META_TITLE_MAX} characters, based on primary keywords, Title Case (e.g. ${TEXT_CASE_EXAMPLES.TITLE_CASE})
  Examples of good meta titles:
  • "Airport Transfer in New York - Reliable Chauffeured Rides"
  • "Limo Service in NYC - Chauffeured, Private Rides" 
  • "Car Service Between NYC and Boston"
  • "Professional Chauffeur Service in Santa Monica"
- Meta description: Maximum ${SEO_LIMITS.META_DESCRIPTION_MAX} characters, based on main and secondary keywords
- H1: max ${SEO_LIMITS.H1_MAX} characters Title Case (e.g. ${TEXT_CASE_EXAMPLES.TITLE_CASE}) - ONLY for H1 titles
- H2: Normal sentence case (e.g. ${TEXT_CASE_EXAMPLES.SENTENCE_CASE}) - NOT Title Case
- CRITICAL: Include minimum ${LINK_CONFIG.MIN_INTERNAL_LINKS} unique Blacklane links within the text by naturally placing them as anchor text
- CRITICAL: Each URL must be used only ONCE - NO DUPLICATE LINKS allowed anywhere in the content
- CRITICAL: Before adding any link, verify it exists in ${LINK_CONFIG.SITEMAP_URL} - DO NOT create or invent URLs
- Use markdown-style links in text: [anchor text](url)
- Prioritize links that match the language "${language}" and main keyword "${mainKeywords}"
- Ensure all ${LINK_CONFIG.MIN_INTERNAL_LINKS}+ links point to different, unique URLs - never repeat the same URL
- Also include local, relevant information to tourists and locals about the area - tourist hotspots, cultural info, etc
- Make content relevant to the main keywords: "${mainKeywords}"
- Use provided main keywords: "${mainKeywords}"
- Use provided secondary keywords: "${secondaryKeywords || 'None provided'}"
- Return only valid JSON object
- Use ${language} language for all content
- In metadata.internalLinksUsed, list all internal links you included`;
};
