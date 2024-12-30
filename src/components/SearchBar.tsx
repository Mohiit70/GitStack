interface SearchBarProps {
  owner: string;
  repo: string;
  onOwnerChange: (value: string) => void;
  onRepoChange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

export function SearchBar({ owner, repo, onOwnerChange, onRepoChange, onRefresh, loading }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={owner}
          onChange={(e) => onOwnerChange(e.target.value)}
          placeholder="Owner"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={repo}
          onChange={(e) => onRepoChange(e.target.value)}
          placeholder="Repository"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  );
}