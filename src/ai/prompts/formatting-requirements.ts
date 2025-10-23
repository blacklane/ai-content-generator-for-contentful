/**
 * Formatting and SEO requirements for content generation
 *
 * Includes meta tags, character limits, and general formatting rules
 */

export const getFormattingRequirements = (
  language: string,
  mainKeywords: string,
  secondaryKeywords: string,
): string => {
  return `Requirements:
- Meta title: Maximum 60 characters, based on primary keywords, Title Case (e.g. Hello World)
  Examples of good meta titles:
  • "Airport Transfer in New York - Reliable Chauffeured Rides"
  • "Limo Service in NYC - Chauffeured, Private Rides" 
  • "Car Service Between NYC and Boston"
  • "Professional Chauffeur Service in Santa Monica"
- Meta description: Maximum 150 characters, based on main and secondary keywords
- H1: max 30 characters Title Case (e.g. Hello World) - ONLY for H1 titles
- H2: Normal sentence case (e.g. Hello world) - NOT Title Case
- CRITICAL: Include minimum 3 unique Blacklane links within the text by naturally placing them as anchor text
- CRITICAL: Each URL must be used only ONCE - NO DUPLICATE LINKS allowed anywhere in the content
- CRITICAL: Before adding any link, verify it exists in https://www.blacklane.com/sitemap.xml - DO NOT create or invent URLs
- Use markdown-style links in text: [anchor text](url)
- Prioritize links that match the language "${language}" and main keyword "${mainKeywords}"
- Ensure all 3+ links point to different, unique URLs - never repeat the same URL
- Also include local, relevant information to tourists and locals about the area - tourist hotspots, cultural info, etc
- Make content relevant to the main keywords: "${mainKeywords}"
- Use provided main keywords: "${mainKeywords}"
- Use provided secondary keywords: "${secondaryKeywords || 'None provided'}"
- Return only valid JSON object
- Use ${language} language for all content
- In metadata.internalLinksUsed, list all internal links you included`;
};
