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
    <div className="flex gap-4">
      <input
        type="text"
        value={owner}
        onChange={(e) => onOwnerChange(e.target.value)}
        placeholder="Owner"
        className="px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={repo}
        onChange={(e) => onRepoChange(e.target.value)}
        placeholder="Repository"
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  );
}