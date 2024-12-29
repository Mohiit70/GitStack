import { Search, RefreshCw } from 'lucide-react';

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
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={owner}
          onChange={(e) => onOwnerChange(e.target.value)}
          placeholder="Owner (e.g. daytonaio)"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={repo}
          onChange={(e) => onRepoChange(e.target.value)}
          placeholder="Repository (e.g. daytona)"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw className="h-5 w-5" />
        )}
        <span className="ml-2">{loading ? 'Loading...' : 'Refresh'}</span>
      </button>
    </div>
  );
}