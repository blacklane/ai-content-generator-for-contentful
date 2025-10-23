/**
 * Main prompt builder for Blacklane Content Generation
 *
 * This module assembles various prompt components into a complete
 * AI prompt for generating Blacklane landing page content.
 *
 * @module prompts
 */

import { getBaseInstructions, getJsonStructure } from './base-instructions';
import {
  getFaqGenerationInstructions,
  getFaqRequirements,
  getHeroRequirements,
  getSeoTextRequirements,
} from './component-requirements';
import { getFormattingRequirements } from './formatting-requirements';
import { getLanguageUrlPatterns } from './language-url-patterns';
import {
  getLinkRequirements,
  LINK_FORMATTING_EXAMPLE,
} from './link-requirements';

export interface PromptTemplateParams {
  mainKeywords: string;
  secondaryKeywords: string;
  questions: string;
  language: string;
  contentTypes: string[];
  contextInfo: string;
  componentExamples: string;
}

/**
 * Builds the complete content generation prompt
 */
export const buildContentGenerationPrompt = (
  params: PromptTemplateParams,
): string => {
  const {
    mainKeywords,
    secondaryKeywords,
    questions,
    language,
    contentTypes,
    contextInfo,
    componentExamples,
  } = params;

  // Build base instructions
  const baseInstructions = getBaseInstructions(
    mainKeywords,
    secondaryKeywords,
    language,
    contentTypes,
    questions,
    contextInfo,
  );

  // Build link requirements section
  const linkRequirements = getLinkRequirements(language, mainKeywords);

  // Build language-specific URL patterns
  const urlPatterns = getLanguageUrlPatterns(language);

  // Build JSON structure
  const jsonStructure = getJsonStructure(
    mainKeywords,
    secondaryKeywords,
    language,
    componentExamples,
  );

  // Build component-specific requirements
  const componentRequirements: string[] = [];

  // SEO Text requirements
  if (contentTypes.includes('seoText')) {
    componentRequirements.push(getSeoTextRequirements());
  }

  // Hero requirements (always include if hero is present)
  if (contentTypes.includes('hero')) {
    componentRequirements.push(getHeroRequirements());
  }

  // FAQ requirements (only if FAQ is selected)
  if (contentTypes.includes('faqs')) {
    componentRequirements.push(getFaqRequirements(questions));
  }

  // Build formatting requirements
  const formattingRequirements = getFormattingRequirements(
    language,
    mainKeywords,
    secondaryKeywords,
  );

  // Build FAQ-specific generation instructions (only if FAQ is selected)
  const faqInstructions = contentTypes.includes('faqs')
    ? `
- For FAQ generation: ${getFaqGenerationInstructions(questions)}`
    : '';

  // Assemble the complete prompt
  return `${baseInstructions}

${linkRequirements}

${urlPatterns}
${LINK_FORMATTING_EXAMPLE}
${jsonStructure}

${formattingRequirements}${faqInstructions}`;
};
