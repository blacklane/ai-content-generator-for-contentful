'use client';

import LoginForm from '@/components/LoginForm';
import ResultModal from '@/components/ResultModal';
import Sidebar from '@/components/Sidebar';
import StepFive from '@/components/StepFive';
import StepFour from '@/components/StepFour';
import StepOne from '@/components/StepOne';
import StepThree from '@/components/StepThree';
import StepTwo from '@/components/StepTwo';
import {
  clearStoredData,
  loadComponentsFromStorage,
  loadFormDataFromStorage,
  saveComponentsToStorage,
  saveFormDataToStorage,
} from '@/utils/storage';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ProjectData {
  mainKeywords: string;
  secondaryKeywords: string;
  questions: string;
  language: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [systemStatus, setSystemStatus] = useState<
    'healthy' | 'degraded' | 'checking'
  >('checking');

  // Flag to prevent saving before initial data is loaded
  const [isInitialized, setIsInitialized] = useState(false);

  const [projectData, setProjectData] = useState<ProjectData>({
    mainKeywords: '',
    secondaryKeywords: '',
    questions: '',
    language: 'en',
  });

  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'hero',
    'seoText',
  ]);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [releaseTitle, setReleaseTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Result modal state
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalData, setResultModalData] = useState<{
    success: boolean;
    title: string;
    message: string;
    contentfulUrl?: string;
    details?: any;
  }>({
    success: false,
    title: '',
    message: '',
  });

  // Check authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      verifyToken(storedToken);
    }
  }, []);

  // Load saved form data and components on mount
  useEffect(() => {
    const savedFormData = loadFormDataFromStorage();
    if (savedFormData) {
      setProjectData(savedFormData);
    }

    const savedComponents = loadComponentsFromStorage();
    if (savedComponents) {
      setSelectedComponents(savedComponents.selectedComponents);
    }

    // Mark as initialized after loading data
    setIsInitialized(true);
  }, []);

  // Check system health
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
    }
  }, [isAuthenticated]);

  // Auto-save form data to localStorage when it changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveFormDataToStorage(projectData);
    }
  }, [projectData, isInitialized]);

  // Auto-save selected components to localStorage when they change (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveComponentsToStorage({ selectedComponents });
    }
  }, [selectedComponents, isInitialized]);

  const checkHealth = async () => {
    try {
      const response = await axios.get('/api/health');
      setSystemStatus(
        response.data.status === 'healthy' ? 'healthy' : 'degraded',
      );
    } catch {
      setSystemStatus('degraded');
    }
  };

  const verifyToken = async (authToken: string) => {
    try {
      const response = await axios.post('/api/auth/verify', {
        token: authToken,
      });
      if (response.data.success) {
        setToken(authToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch {
      localStorage.removeItem('authToken');
    }
  };

  const handleLogin = async (username: string, password: string) => {
    const response = await axios.post('/api/auth/login', {
      username,
      password,
    });
    if (response.data.success) {
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      setIsAuthenticated(true);
    } else {
      throw new Error('Login failed');
    }
  };

  const handleGenerateContent = async () => {
    setLoading(true);
    setCurrentStep(3);
    // Clear previous release title to allow auto-fill with new content
    setReleaseTitle('');

    try {
      const response = await axios.post(
        '/api/generate',
        {
          mainKeywords: projectData.mainKeywords,
          secondaryKeywords: projectData.secondaryKeywords,
          questions: projectData.questions,
          components: selectedComponents,
          language: projectData.language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setGeneratedContent(response.data.data.generated);
      }
    } catch (error: any) {
      console.error('Generation failed:', error);
      alert('Content generation failed. Please try again.');
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);

    try {
      const response = await axios.post(
        '/api/publish',
        {
          generatedContent,
          releaseTitle,
          language: projectData.language,
          selectedComponents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        // Show success modal
        setResultModalData({
          success: true,
          title: '🎉 Publishing Successful!',
          message:
            'Your content has been successfully uploaded to Contentful as a draft. You can now review and publish it in the Contentful dashboard.',
          contentfulUrl: response.data.data.contentfulUrl,
          details: {
            releaseTitle: response.data.data.releaseTitle,
            totalComponents: response.data.data.totalComponents,
            releaseId: response.data.data.releaseId,
          },
        });
        setShowResultModal(true);
      }
    } catch (error: any) {
      console.error('Publishing failed:', error);
      // Show error modal
      setResultModalData({
        success: false,
        title: '❌ Publishing Failed',
        message:
          error.response?.data?.message ||
          'Failed to publish content to Contentful. Please try again.',
      });
      setShowResultModal(true);
    } finally {
      setPublishing(false);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);

    // Reset to start only if successful
    if (resultModalData.success) {
      // Prevent auto-save during reset
      setIsInitialized(false);

      setCurrentStep(1);
      setProjectData({
        mainKeywords: '',
        secondaryKeywords: '',
        questions: '',
        language: 'en',
      });
      setSelectedComponents(['hero', 'seoText']);
      setGeneratedContent(null);
      setReleaseTitle('');

      // Clear saved data from localStorage
      clearStoredData();

      // Re-enable auto-save
      setIsInitialized(true);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset the session? This will clear all your progress.',
      )
    ) {
      // Prevent auto-save during reset
      setIsInitialized(false);

      setCurrentStep(1);
      setProjectData({
        mainKeywords: '',
        secondaryKeywords: '',
        questions: '',
        language: 'en',
      });
      setSelectedComponents(['hero', 'seoText']);
      setGeneratedContent(null);
      setReleaseTitle('');

      // Clear saved data from localStorage
      clearStoredData();

      // Re-enable auto-save
      setIsInitialized(true);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-cursor-bg">
      <Sidebar currentStep={currentStep} systemStatus={systemStatus} />

      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="border-b border-cursor-border bg-cursor-sidebar/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="px-6 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-cursor-text">
                Contentful AI Page Generator
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="btn btn-error btn-sm">
                Reset session
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-w-5xl mx-auto">
          {currentStep === 1 && (
            <StepOne
              projectData={projectData}
              onUpdate={data => setProjectData({ ...projectData, ...data })}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              selectedComponents={selectedComponents}
              onUpdate={setSelectedComponents}
              onNext={handleGenerateContent}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              generatedContent={generatedContent}
              loading={loading}
              onBack={() => setCurrentStep(2)}
              onNext={() => {
                // Auto-fill deployment title from generated content
                if (generatedContent) {
                  // Try to extract metaTitle from various possible locations
                  const metaTitle =
                    generatedContent.metaTitle ||
                    generatedContent.metadata?.metaTitle ||
                    generatedContent.hero?.heading ||
                    generatedContent.seoText?.title ||
                    projectData.mainKeywords;

                  if (metaTitle && !releaseTitle) {
                    setReleaseTitle(metaTitle);
                  }
                }
                setCurrentStep(4);
              }}
            />
          )}

          {currentStep === 4 && (
            <StepFour
              releaseTitle={releaseTitle}
              selectedComponents={selectedComponents}
              onUpdate={setReleaseTitle}
              onBack={() => setCurrentStep(3)}
              onNext={() => setCurrentStep(5)}
            />
          )}

          {currentStep === 5 && (
            <StepFive
              releaseTitle={releaseTitle}
              selectedComponents={selectedComponents}
              publishing={publishing}
              onBack={() => setCurrentStep(4)}
              onPublish={handlePublish}
            />
          )}
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResultModal}
        success={resultModalData.success}
        title={resultModalData.title}
        message={resultModalData.message}
        contentfulUrl={resultModalData.contentfulUrl}
        details={resultModalData.details}
        onClose={handleCloseResultModal}
      />
    </div>
  );
}
