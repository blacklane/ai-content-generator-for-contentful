'use client';

interface StepFiveProps {
  releaseTitle: string;
  selectedComponents: string[];
  publishing: boolean;
  onBack: () => void;
  onPublish: () => void;
}

export default function StepFive({ releaseTitle, selectedComponents, publishing, onBack, onPublish }: StepFiveProps) {
  return (
    <div className="card cursor-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cursor-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold">5</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-cursor-text">
            Ready to Deploy
          </h2>
          <p className="text-sm text-cursor-muted">
            Page is ready to be saved to Contentful
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 bg-cursor-bg rounded-lg border border-cursor-border">
          <h4 className="font-medium text-cursor-text mb-3">
            Publishing Summary
          </h4>
          <div className="space-y-2 text-sm text-cursor-muted">
            <div className="flex items-center gap-2">
              <span className="font-medium text-cursor-text">Title:</span>
              <span>{releaseTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-cursor-text">Components:</span>
              <span>{selectedComponents.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-cursor-text">Status:</span>
              <span>Will be created as Draft</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-cursor-border">
        <button onClick={onBack} disabled={publishing} className="btn btn-outline">
          ← Back to Upload Configuration
        </button>
        <button
          onClick={onPublish}
          disabled={publishing}
          className="btn bg-cursor-accent hover:bg-cursor-accent/80 text-white disabled:opacity-50"
        >
          {publishing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Uploading...
            </>
          ) : (
            <>
              📤 Upload to Contentful
            </>
          )}
        </button>
      </div>
    </div>
  );
}

