function Loading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-sm text-slate-500">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />

      <span>{message}</span>
    </div>
  );
}

export default Loading;