/**
 * Base instructions and JSON structure for AI content generation
 *
 * Defines the main prompt structure and expected JSON output format
 */

import { COMPONENT_TYPES } from './constants';

export const getBaseInstructions = (
  mainKeywords: string,
  secondaryKeywords: string,
  language: string,
  contentTypes: string[],
  questions: string,
  contextInfo: string,
): string => {
  const questionsSection =
    contentTypes.includes(COMPONENT_TYPES.FAQS) && questions
      ? `
Questions: ${questions} (These will be prioritized in FAQ generation)`
      : contentTypes.includes(COMPONENT_TYPES.FAQS)
        ? `
Questions: Not provided (FAQ questions will be AI-generated based on keywords)`
        : '';

  return `Write a landing page for Blacklane with these parameters:

Main keywords: ${mainKeywords}
Secondary keyword: ${secondaryKeywords || 'Not provided'}${questionsSection}
Language: ${language}
Content types needed: ${contentTypes.join(', ')}${contextInfo}`;
};

export const getJsonStructure = (
  mainKeywords: string,
  secondaryKeywords: string,
  language: string,
  componentExamples: string,
): string => {
  return `
RETURN ONLY VALID JSON (no markdown, no prose):
{
  "mainKeywords": "${mainKeywords}",
  "secondaryKeywords": "${secondaryKeywords}",
  "language": "${language}",
  "metaTitle": "SEO optimized title based on primary keywords (max 60 chars)",
  "metaDescription": "SEO optimized description based on main and secondary keywords (max 150 chars)",
  "generatedSections": [
${componentExamples}
  ],
  "metadata": {
    "keywordsUsed": ["keyword1", "keyword2"],
    "internalLinksUsed": ["link1", "link2", "link3"],
    "generatedAt": "${new Date().toISOString()}"
  }
}`;
};
