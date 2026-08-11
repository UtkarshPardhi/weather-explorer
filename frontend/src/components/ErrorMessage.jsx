function ErrorMessage({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <p>{message}</p>

      {onClose && (
        <button
          onClick={onClose}
          className="font-semibold hover:text-red-900"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;