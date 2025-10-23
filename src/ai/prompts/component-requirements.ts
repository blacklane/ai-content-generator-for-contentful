/**
 * Component-specific requirements for Hero, FAQ, and SEO Text
 *
 * Defines generation rules for individual content components
 */

import { COMPONENT_CONFIG, CONTENT_LIMITS, FAQ_CONFIG } from './constants';

export const getHeroRequirements = (): string => {
  return '- Hero components: Do NOT generate CTA text, CTA links, or CTA buttons - leave these empty';
};

export const getFaqRequirements = (): string => {
  return `- FAQ: Generate ${FAQ_CONFIG.QUESTIONS_RANGE} questions total. If questions are provided in the "Questions" field, use those FIRST as priority questions. If provided questions are fewer than ${FAQ_CONFIG.QUESTIONS_RANGE}, supplement with AI-generated questions relevant to the keywords to reach the recommended ${FAQ_CONFIG.QUESTIONS_RANGE} total questions. If no questions are provided, generate ${FAQ_CONFIG.QUESTIONS_RANGE} relevant questions based on keywords.
- FAQ questions: Normal sentence case (e.g. How can I book a ride?) - NOT Title Case`;
};

export const getFaqGenerationInstructions = (questions: string): string => {
  return questions
    ? `PRIORITIZE these provided questions: "${questions}". Use these as your primary FAQ questions, then supplement with additional AI-generated questions if needed to reach ${FAQ_CONFIG.QUESTIONS_RANGE} total questions.`
    : `No specific questions provided - generate ${FAQ_CONFIG.QUESTIONS_RANGE} relevant FAQ questions based on the main keywords and topic.`;
};

export const getSeoTextRequirements = (): string => {
  const positions = COMPONENT_CONFIG.SEO_TEXT_IMAGE_POSITIONS.map(
    (pos, i) => `${i + 1}st section = "${pos}"`,
  ).join(', ');

  return `- Body copy: minimum ${CONTENT_LIMITS.SEO_TEXT_MIN} characters, maximum ${CONTENT_LIMITS.SEO_TEXT_MAX} characters per seoText section
- CRITICAL: If seoText is requested, generate EXACTLY ${COMPONENT_CONFIG.SEO_TEXT_SECTIONS_COUNT} seoText sections with unique content
- CRITICAL: For seoText components, use alternating imagePosition pattern: ${positions} (checkerboard pattern)
- CRITICAL: For seoText components, do NOT generate imageAltText or assign images - leave these fields empty`;
};
