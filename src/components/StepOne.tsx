'use client';

interface ProjectData {
  mainKeywords: string;
  secondaryKeywords: string;
  questions: string;
  language: string;
}

interface StepOneProps {
  projectData: ProjectData;
  onUpdate: (data: Partial<ProjectData>) => void;
  onNext: () => void;
}

export default function StepOne({
  projectData,
  onUpdate,
  onNext,
}: StepOneProps) {
  const isValid =
    projectData.mainKeywords.trim().length > 0 &&
    projectData.secondaryKeywords.trim().length > 0;

  return (
    <div className="card cursor-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cursor-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold">1</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-cursor-text">
            What do you want to create?
          </h2>
          <p className="text-sm text-cursor-muted">
            Describe your project and goals
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cursor-text">
            Main Keywords *
          </label>
          <textarea
            value={projectData.mainKeywords}
            onChange={e => onUpdate({ mainKeywords: e.target.value })}
            placeholder="e.g., Premium Airport Transfer Service"
            className="textarea textarea-bordered w-full h-24 resize-none"
          />
          <p className="text-xs text-cursor-muted">
            Separate main keywords with commas
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cursor-text">
            Secondary Keywords *
          </label>
          <textarea
            value={projectData.secondaryKeywords}
            onChange={e => onUpdate({ secondaryKeywords: e.target.value })}
            placeholder="e.g., luxury, professional, reliable transport"
            className="textarea textarea-bordered w-full h-20 resize-none"
          />
          <p className="text-xs text-cursor-muted">
            Secondary keywords, separate with commas
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cursor-text">
            Questions (optional)
          </label>
          <textarea
            value={projectData.questions}
            onChange={e => onUpdate({ questions: e.target.value })}
            placeholder="Questions to address in the content"
            className="textarea textarea-bordered w-full h-24 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cursor-text">
            Page Language
          </label>
          <select
            value={projectData.language}
            onChange={e => onUpdate({ language: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="en">🇺🇸 English</option>
            <option value="de">🇩🇪 German</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-cursor-border">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn bg-cursor-accent hover:bg-cursor-accent/80 text-white disabled:opacity-50"
        >
          Next: Choose Components
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
