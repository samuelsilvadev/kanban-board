import { useAuth } from "../state/hooks/useAuth";

export function LogoutButton() {
  const { logout, error, isLoading } = useAuth();

  return (
    <button
      data-testid="logout-button"
      className="border border-slate-700 px-4 py-2 flex-shrink-0  disabled:opacity-50 disabled:bg-red-400 disabled:border-red-400 disabled:cursor-not-allowed"
      onClick={logout}
      disabled={!!error || isLoading}
      title={
        error ? `Error logging out: ${error.message ?? "Unknown"}` : undefined
      }
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
