import { useEffect } from "react";
import { useAuth } from "../state/hooks/useAuth";

export function Login() {
  const { getAuthUrl, authUrl, isLoading } = useAuth();

  useEffect(() => {
    getAuthUrl();
  }, [getAuthUrl]);

  const handleOnLogin = () => {
    if (!authUrl) {
      return;
    }

    window.location.assign(authUrl);
  };

  return (
    <main className="h-[100dvh] w-full flex items-center justify-center">
      <button
        className="border-4 border-slate-700 px-4 py-2 flex-shrink-0 text-2xl disabled:opacity-50"
        disabled={!authUrl || isLoading}
        onClick={handleOnLogin}
      >
        Login
      </button>
    </main>
  );
}
