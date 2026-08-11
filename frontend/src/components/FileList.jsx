function FileList({
  files,
  selectedFile,
  onSelect,
  loading,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Stored Files
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Weather data stored in AWS S3.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {files.length}
        </span>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading files...
        </p>
      ) : files.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
          <p className="text-sm text-slate-500">
            No stored weather files yet.
          </p>
        </div>
      ) : (
        <div className="max-h-[420px] space-y-2 overflow-y-auto">
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => onSelect(file.name)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                selectedFile === file.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="break-all text-sm font-medium text-slate-800">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {file.size} bytes •{" "}
                {new Date(file.created_at).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileList;