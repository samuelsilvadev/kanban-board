import { useSearchTerm } from "../state/hooks/useSearchTerm";

export function Search() {
  const { searchTerm, setSearchTerm } = useSearchTerm();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="w-full">
      <label htmlFor="search" className="sr-only">
        Search for a task
      </label>
      <input
        value={searchTerm}
        onChange={handleOnChange}
        id="search"
        type="search"
        placeholder="Search for a task"
        className="w-full p-4 text-lg text-gray-900 border border-slate-700"
      />
    </form>
  );
}
