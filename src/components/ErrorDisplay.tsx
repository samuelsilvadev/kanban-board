import { Link } from "react-router-dom";

type ErrorDisplayProps = {
  message: string;
  onReload?: () => void;
  errorStatus?: number;
};

function shouldDisplayLoginButton(
  errorStatus: ErrorDisplayProps["errorStatus"]
) {
  return errorStatus && [401, 403].includes(errorStatus);
}

export function ErrorDisplay({
  message,
  errorStatus,
  onReload,
}: ErrorDisplayProps) {
  return (
    <div className="h-screen flex items-center justify-center flex-col text-red-500">
      <h1 className="text-2xl  border-red-500 border-2 px-4 py-6">
        🚨 {message} 🚨
      </h1>
      <div className="flex gap-3">
        {onReload && (
          <button
            className="mt-5 border-red-500 border-2 px-5"
            onClick={onReload}
          >
            Try to reload
          </button>
        )}
        {shouldDisplayLoginButton(errorStatus) && (
          <Link className="mt-5 border-red-500 border-2 px-5" to="/">
            Login again?
          </Link>
        )}
      </div>
    </div>
  );
}
