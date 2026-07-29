import React from "react";

const ErrorCard = ({ title, message, onRetry, actionLabel = "Try again", onClose, compact = false }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
      <div
        role="alert"
        className={`w-full max-w-sm rounded-3xl border border-red-200 bg-white p-5 text-sm text-red-700 shadow-2xl ${compact ? "" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-red-800">{title}</p>
            <p className="mt-2 text-red-600">{message}</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
              aria-label="Close error"
            >
              ×
            </button>
          )}
        </div>

        {onRetry && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onRetry}
              className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
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
