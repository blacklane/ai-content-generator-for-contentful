'use client';

import LoginForm from '@/components/LoginForm';
import Sidebar from '@/components/Sidebar';
import StepFive from '@/components/StepFive';
import StepFour from '@/components/StepFour';
import StepOne from '@/components/StepOne';
import StepThree from '@/components/StepThree';
import StepTwo from '@/components/StepTwo';
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
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'degraded' | 'checking'>('checking');
  
  const [projectData, setProjectData] = useState<ProjectData>({
    mainKeywords: '',
    secondaryKeywords: '',
    questions: '',
    language: 'en',
  });
  
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['hero']);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [releaseTitle, setReleaseTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      verifyToken(storedToken);
    }
  }, []);

  // Check system health
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
    }
  }, [isAuthenticated]);

  const checkHealth = async () => {
    try {
      const response = await axios.get('/api/health');
      setSystemStatus(response.data.status === 'healthy' ? 'healthy' : 'degraded');
    } catch (error) {
      setSystemStatus('degraded');
    }
  };

  const verifyToken = async (authToken: string) => {
    try {
      const response = await axios.post('/api/auth/verify', { token: authToken });
      if (response.data.success) {
        setToken(authToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      localStorage.removeItem('authToken');
    }
  };

  const handleLogin = async (username: string, password: string) => {
    const response = await axios.post('/api/auth/login', { username, password });
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
        }
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
        }
      );
      
      if (response.data.success) {
        alert(`✅ Success! Content published to Contentful.\n\nRelease: ${releaseTitle}\nComponents: ${response.data.data.totalComponents}`);
        // Reset to start
        setCurrentStep(1);
        setProjectData({
          mainKeywords: '',
          secondaryKeywords: '',
          questions: '',
          language: 'en',
        });
        setSelectedComponents(['hero']);
        setGeneratedContent(null);
        setReleaseTitle('');
      }
    } catch (error: any) {
      console.error('Publishing failed:', error);
      alert('Publishing failed. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the session? This will clear all your progress.')) {
      setCurrentStep(1);
      setProjectData({
        mainKeywords: '',
        secondaryKeywords: '',
        questions: '',
        language: 'en',
      });
      setSelectedComponents(['hero']);
      setGeneratedContent(null);
      setReleaseTitle('');
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
          <div className="px-4 py-2 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-cursor-text">
                AI Page Generator
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
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
          {currentStep === 1 && (
            <StepOne
              projectData={projectData}
              onUpdate={(data) => setProjectData({ ...projectData, ...data })}
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
              onNext={() => setCurrentStep(4)}
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
    </div>
  );
}

