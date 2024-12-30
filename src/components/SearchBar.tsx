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
      <div className="flex-1 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={owner}
            onChange={(e) => onOwnerChange(e.target.value)}
            placeholder="Owner"
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={repo}
            onChange={(e) => onRepoChange(e.target.value)}
            placeholder="Repository"
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        {loading ? (
          <RefreshCw className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <RefreshCw className="h-5 w-5 mr-2" />
        )}
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  );
}

