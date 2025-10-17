'use client';

interface StepFourProps {
  releaseTitle: string;
  selectedComponents: string[];
  onUpdate: (title: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepFour({
  releaseTitle,
  selectedComponents,
  onUpdate,
  onBack,
  onNext,
}: StepFourProps) {
  const isValid = releaseTitle.trim().length > 0;

  return (
    <div className="card cursor-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cursor-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold">4</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-cursor-text">
            Upload Configuration
          </h2>
          <p className="text-sm text-cursor-muted">
            Configure your page deployment
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-md font-medium text-cursor-text mb-4">
          Publishing Method
        </h3>
        <div className="p-4 rounded-lg border-2 border-cursor-accent bg-cursor-accent/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-cursor-text">
                Contentful Launch
              </h4>
              <p className="text-xs text-cursor-muted">
                Coordinate page publishing
              </p>
            </div>
          </div>
          <p className="text-sm text-cursor-muted">
            Create a release in Contentful for organized content management.
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cursor-text block">
            Deployment Title *
          </label>
          <input
            type="text"
            value={releaseTitle}
            onChange={e => onUpdate(e.target.value)}
            placeholder="e.g., Landing Page v1.0 - Premium Service"
            className="input input-bordered w-full text-base"
            autoComplete="off"
          />
          {!releaseTitle && (
            <p className="text-xs text-cursor-muted mt-1">
              Enter a descriptive title for your Contentful release
            </p>
          )}
        </div>

        <div className="p-4 bg-cursor-bg rounded-lg border border-cursor-border">
          <h4 className="font-medium text-cursor-text mb-2">
            Deployment Summary
          </h4>
          <div className="space-y-1 text-sm text-cursor-muted">
            <div>• {selectedComponents.length} components will be included</div>
            <div>• Deployment will be created in Contentful</div>
            <div>
              • Publishing: <span className="text-cursor-text">Draft</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-cursor-border">
        <button onClick={onBack} className="btn btn-outline">
          ← Back to JSON Preview
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn bg-cursor-accent hover:bg-cursor-accent/80 text-white disabled:opacity-50"
        >
          Proceed to Upload
        </button>
      </div>
    </div>
  );
}
