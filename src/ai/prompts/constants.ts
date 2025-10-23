/**
 * Constants for AI content generation
 *
 * Central place for all magic numbers, limits, and configuration values
 * used across prompt generation modules.
 */

/**
 * FAQ Configuration
 */
export const FAQ_CONFIG = {
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 6,
  QUESTIONS_RANGE: '5-6',
} as const;

export const SEO_LIMITS = {
  META_TITLE_MAX: 60,
  META_DESCRIPTION_MAX: 150,
  H1_MAX: 30,
} as const;

export const CONTENT_LIMITS = {
  SEO_TEXT_MIN: 700,
  SEO_TEXT_MAX: 1050,
} as const;

export const COMPONENT_CONFIG = {
  SEO_TEXT_SECTIONS_COUNT: 3,
  SEO_TEXT_IMAGE_POSITIONS: ['left', 'right', 'left'] as const,
} as const;

export const LINK_CONFIG = {
  MIN_INTERNAL_LINKS: 3,
  SITEMAP_URL: 'https://www.blacklane.com/sitemap.xml',
} as const;

export const COMPONENT_TYPES = {
  HERO: 'hero',
  FAQS: 'faqs',
  SEO_TEXT: 'seoText',
} as const;

export const TEXT_CASE_EXAMPLES = {
  TITLE_CASE: 'Hello World',
  SENTENCE_CASE: 'Hello world',
} as const;
