'use client';

interface SidebarProps {
  currentStep: number;
  systemStatus: 'healthy' | 'degraded' | 'checking';
}

const steps = [
  { number: 1, label: 'Topic & Goals' },
  { number: 2, label: 'Components' },
  { number: 3, label: 'Generation' },
  { number: 4, label: 'Deployment' },
  { number: 5, label: 'Upload' },
];

export default function Sidebar({ currentStep, systemStatus }: SidebarProps) {
  const statusColors = {
    healthy: 'bg-green-500',
    degraded: 'bg-yellow-500',
    checking: 'bg-gray-500',
  };

  const statusText = {
    healthy: 'All systems operational',
    degraded: 'Some services unavailable',
    checking: 'Checking connection...',
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-cursor-sidebar border-r border-cursor-border z-30 hidden lg:block">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-sm font-medium text-cursor-text mb-3">
            Progress
          </h3>
          <div className="space-y-2">
            {steps.map(step => (
              <div key={step.number} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step.number === currentStep
                      ? 'bg-cursor-accent text-white'
                      : step.number < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-cursor-border text-cursor-muted'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm ${
                    step.number === currentStep
                      ? 'text-cursor-text font-medium'
                      : 'text-cursor-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-cursor-bg border border-cursor-border">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-2 h-2 rounded-full ${statusColors[systemStatus]}`}
            ></div>
            <span className="text-sm font-medium text-cursor-text">
              System Status
            </span>
          </div>
          <p className="text-xs text-cursor-muted">
            {statusText[systemStatus]}
          </p>
        </div>
      </div>
    </div>
  );
}
