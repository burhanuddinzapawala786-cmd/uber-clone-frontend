import React from "react";

const ErrorCard = ({ title, message, onRetry, actionLabel = "Try again", onClose, compact = false }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4" onClick={onClose}>
      <div
        role="alert"
        className={`w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl ${compact ? "" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="12" y1="8" x2="12" y2="13" />
                <circle cx="12" cy="16.5" r="0.9" fill="white" stroke="none" />
                <circle cx="12" cy="12" r="9.5" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-black">{title}</p>
              <p className="mt-1 text-sm leading-snug text-gray-500">{message}</p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              aria-label="Close error"
            >
              ×
            </button>
          )}
        </div>

        {onRetry && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onRetry}
              className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.98]"
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorCard;
