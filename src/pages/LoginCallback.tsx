import { useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { useAuth } from "../state/hooks/useAuth";

export function LoginCallback() {
  const { getAuthToken, isLoading, error, isAuthUserLoaded } = useAuth();
  const [searchParameters] = useSearchParams();
  const code = searchParameters.get("code");

  useEffect(() => {
    if (code) {
      getAuthToken(code);
    }
  }, [code, getAuthToken]);

  if (!code) {
    return (
      <ErrorDisplay message="Missing necessary data to display the page" />
    );
  }

  if (isLoading || !isAuthUserLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error to Sign in</div>;
  }

  return <Navigate to="/tasks" />;
}
