'use client';

interface StepTwoProps {
  selectedComponents: string[];
  onUpdate: (components: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const COMPONENTS = [
  {
    id: 'hero',
    name: 'Hero Component',
    description: 'Main headline, subtitle, and call-to-action',
    required: true,
  },
  {
    id: 'faqs',
    name: 'FAQs',
    description: 'Frequently asked questions section',
    required: false,
  },
  {
    id: 'seoText',
    name: 'SEO Text + Image',
    description: 'SEO-optimized content blocks with images',
    required: false,
  },
];

export default function StepTwo({ selectedComponents, onUpdate, onNext, onBack }: StepTwoProps) {
  const toggleComponent = (componentId: string) => {
    if (componentId === 'hero') return; // Hero is always selected

    const isSelected = selectedComponents.includes(componentId);
    const newSelected = isSelected
      ? selectedComponents.filter((id) => id !== componentId)
      : [...selectedComponents, componentId];

    onUpdate(newSelected);
  };

  return (
    <div className="card cursor-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cursor-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold">2</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-cursor-text">
            Select Content Components
          </h2>
          <p className="text-sm text-cursor-muted">
            Choose which sections to include in your page
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {COMPONENTS.map((component) => {
          const isSelected = selectedComponents.includes(component.id);

          return (
            <div
              key={component.id}
              onClick={() => toggleComponent(component.id)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-cursor-accent bg-cursor-accent/10'
                  : 'border-cursor-border hover:border-cursor-accent/50'
              } ${component.required ? 'cursor-not-allowed opacity-90' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-cursor-text">
                  {component.name}
                </span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={component.required}
                  readOnly
                  className="checkbox checkbox-primary"
                />
              </div>
              <p className="text-sm text-cursor-muted">
                {component.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-cursor-border">
        <button onClick={onBack} className="btn btn-outline">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="btn bg-cursor-accent hover:bg-cursor-accent/80 text-white"
        >
          Generate Content
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

