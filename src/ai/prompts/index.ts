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
import { COMPONENT_TYPES } from './constants';
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

  const baseInstructions = getBaseInstructions(
    mainKeywords,
    secondaryKeywords,
    language,
    contentTypes,
    questions,
    contextInfo,
  );

  const linkRequirements = getLinkRequirements(language, mainKeywords);

  const urlPatterns = getLanguageUrlPatterns(language);

  const jsonStructure = getJsonStructure(
    mainKeywords,
    secondaryKeywords,
    language,
    componentExamples,
  );

  const componentRequirements: string[] = [];
  let faqInstructions = '';

  if (contentTypes.includes(COMPONENT_TYPES.SEO_TEXT)) {
    componentRequirements.push(getSeoTextRequirements());
  }

  if (contentTypes.includes(COMPONENT_TYPES.HERO)) {
    componentRequirements.push(getHeroRequirements());
  }

  if (contentTypes.includes(COMPONENT_TYPES.FAQS)) {
    componentRequirements.push(getFaqRequirements());
  }

  const formattingRequirements = getFormattingRequirements(
    language,
    mainKeywords,
    secondaryKeywords,
  );

  if (contentTypes.includes(COMPONENT_TYPES.FAQS)) {
    faqInstructions = `
- For FAQ generation: ${getFaqGenerationInstructions(questions)}`;
  }

  return `${baseInstructions}

${linkRequirements}

${urlPatterns}
${LINK_FORMATTING_EXAMPLE}
${jsonStructure}

${formattingRequirements}${faqInstructions}`;
};

export {
  COMPONENT_CONFIG,
  COMPONENT_TYPES,
  CONTENT_LIMITS,
  FAQ_CONFIG,
  LINK_CONFIG,
  SEO_LIMITS,
  TEXT_CASE_EXAMPLES,
} from './constants';
