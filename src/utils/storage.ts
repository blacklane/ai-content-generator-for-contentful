// LocalStorage management for form data persistence

const FORM_DATA_KEY = 'contentful_ai_form_data';
const COMPONENTS_KEY = 'contentful_ai_components';

export interface StoredFormData {
  mainKeywords: string;
  secondaryKeywords: string;
  questions: string;
  language: string;
}

export interface StoredComponentsData {
  selectedComponents: string[];
}

/**
 * Save form data to localStorage
 */
export const saveFormDataToStorage = (data: StoredFormData): void => {
  try {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save form data to storage:', error);
  }
};

/**
 * Load form data from localStorage
 */
export const loadFormDataFromStorage = (): StoredFormData | null => {
  try {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (!savedData) {
      return null;
    }

    const formData = JSON.parse(savedData);
    return {
      mainKeywords: formData.mainKeywords || '',
      secondaryKeywords: formData.secondaryKeywords || '',
      questions: formData.questions || '',
      language: formData.language || 'en',
    };
  } catch (error) {
    console.warn('Failed to load form data from storage:', error);
    return null;
  }
};

/**
 * Save selected components to localStorage
 */
export const saveComponentsToStorage = (data: StoredComponentsData): void => {
  try {
    localStorage.setItem(COMPONENTS_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save components to storage:', error);
  }
};

/**
 * Load selected components from localStorage
 */
export const loadComponentsFromStorage = (): StoredComponentsData | null => {
  try {
    const savedData = localStorage.getItem(COMPONENTS_KEY);
    if (!savedData) {
      return null;
    }

    const componentsData = JSON.parse(savedData);
    return {
      selectedComponents: componentsData.selectedComponents || [
        'hero',
        'seoText',
      ],
    };
  } catch (error) {
    console.warn('Failed to load components from storage:', error);
    return null;
  }
};

/**
 * Clear all saved data from localStorage
 */
export const clearStoredData = (): void => {
  try {
    localStorage.removeItem(FORM_DATA_KEY);
    localStorage.removeItem(COMPONENTS_KEY);
  } catch (error) {
    console.warn('Failed to clear stored data:', error);
  }
};
