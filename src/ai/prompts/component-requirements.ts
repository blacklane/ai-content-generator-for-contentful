/**
 * Component-specific requirements for Hero, FAQ, and SEO Text
 *
 * Defines generation rules for individual content components
 */

export const getHeroRequirements = (): string => {
  return `- Hero components: Do NOT generate CTA text, CTA links, or CTA buttons - leave these empty`;
};

export const getFaqRequirements = (questions: string): string => {
  return `- FAQ: Generate 5-6 questions total. If questions are provided in the "Questions" field, use those FIRST as priority questions. If provided questions are fewer than 5-6, supplement with AI-generated questions relevant to the keywords to reach the recommended 5-6 total questions. If no questions are provided, generate 5-6 relevant questions based on keywords.
- FAQ questions: Normal sentence case (e.g. How can I book a ride?) - NOT Title Case`;
};

export const getFaqGenerationInstructions = (questions: string): string => {
  return questions
    ? `PRIORITIZE these provided questions: "${questions}". Use these as your primary FAQ questions, then supplement with additional AI-generated questions if needed to reach 5-6 total questions.`
    : 'No specific questions provided - generate 5-6 relevant FAQ questions based on the main keywords and topic.';
};

export const getSeoTextRequirements = (): string => {
  return `- Body copy: minimum 700 characters, maximum 1050 characters per seoText section
- CRITICAL: If seoText is requested, generate EXACTLY 3 seoText sections with unique content
- CRITICAL: For seoText components, use alternating imagePosition pattern: 1st section = "left", 2nd section = "right", 3rd section = "left" (checkerboard pattern)
- CRITICAL: For seoText components, do NOT generate imageAltText or assign images - leave these fields empty`;
};
