'use client';

interface ResultModalProps {
  isOpen: boolean;
  success: boolean;
  title: string;
  message: string;
  contentfulUrl?: string;
  details?: {
    releaseTitle?: string;
    totalComponents?: number;
    releaseId?: string;
  };
  onClose: () => void;
}

export default function ResultModal({
  isOpen,
  success,
  title,
  message,
  contentfulUrl,
  details,
  onClose,
}: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl bg-gray-900 border border-gray-700">
        <div className="p-2">
        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
              success ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {success ? '✓' : '✗'}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>

        {/* Modal Content */}
        <div className="max-h-[55vh] overflow-y-auto">
          <div className="text-gray-300 leading-relaxed text-base mb-4">
            <p className="mb-4">{message}</p>

            {details && (
              <div className="bg-cursor-bg p-4 rounded-lg border border-cursor-border space-y-2 mb-4">
                {details.releaseTitle && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-cursor-text">Release:</span>
                    <span className="text-cursor-muted">{details.releaseTitle}</span>
                  </div>
                )}
                {details.totalComponents !== undefined && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-cursor-text">Components:</span>
                    <span className="text-cursor-muted">{details.totalComponents} created</span>
                  </div>
                )}
                {details.releaseId && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-cursor-text">Release ID:</span>
                    <span className="text-cursor-muted font-mono text-sm">{details.releaseId}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Links Section */}
          {contentfulUrl && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={contentfulUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in Contentful
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-success">
            Done
          </button>
        </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button type="button">close</button>
      </form>
    </dialog>
  );
}

