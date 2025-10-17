'use client';

interface StepThreeProps {
  generatedContent: any;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function StepThree({
  generatedContent,
  loading,
  onBack,
  onNext,
}: StepThreeProps) {
  return (
    <div className="card cursor-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-cursor-text">
            {loading ? 'Generating Content...' : 'Generation Preview'}
          </h2>
          <p className="text-sm text-cursor-muted">
            {loading
              ? 'Please wait while AI creates your content'
              : 'Review the generated content'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="loading loading-spinner loading-lg text-cursor-accent"></span>
          <p className="mt-4 text-cursor-muted">
            This may take a few moments...
          </p>
        </div>
      ) : generatedContent ? (
        <div className="space-y-6">
          <div className="mockup-code bg-cursor-bg">
            <pre className="px-6 py-4 overflow-x-auto">
              <code className="text-sm text-cursor-text">
                {JSON.stringify(generatedContent, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-cursor-muted">
          No content generated yet
        </div>
      )}

      {!loading && (
        <div className="flex justify-between pt-6 border-t border-cursor-border">
          <button onClick={onBack} className="btn btn-outline">
            ← Back to Components
          </button>
          <button
            onClick={onNext}
            disabled={!generatedContent}
            className="btn bg-cursor-accent hover:bg-cursor-accent/80 text-white disabled:opacity-50"
          >
            Next: Deployment Setup →
          </button>
        </div>
      )}
    </div>
  );
}
