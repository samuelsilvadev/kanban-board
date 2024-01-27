type ErrorDisplayProps = {
  message: string;
  onReload?: () => void;
};

export function ErrorDisplay({ message, onReload }: ErrorDisplayProps) {
  return (
    <div className="h-screen flex items-center justify-center flex-col text-red-500">
      <h1 className="text-2xl  border-red-500 border-2 px-4 py-6">
        🚨 {message} 🚨
      </h1>
      {onReload && (
        <button
          className="mt-5 border-red-500 border-2 px-5"
          onClick={onReload}
        >
          Try to reload
        </button>
      )}
    </div>
  );
}
