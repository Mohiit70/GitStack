import { useState } from 'react';
import { GitBranch, Search, ArrowRight } from 'lucide-react';
import { RepoStats } from '../services/github';
import { StatsComparison } from './StatsComparison';

interface ComparisonViewProps {
  onCompare: (owner1: string, repo1: string, owner2: string, repo2: string) => Promise<void>;
  loading: boolean;
  stats1: RepoStats | null;
  stats2: RepoStats | null;
}

export function ComparisonView({ onCompare, loading, stats1, stats2 }: ComparisonViewProps) {
  const [owner1, setOwner1] = useState('');
  const [repo1, setRepo1] = useState('');
  const [owner2, setOwner2] = useState('');
  const [repo2, setRepo2] = useState('');

  const handleCompare = () => {
    onCompare(owner1, repo1, owner2, repo2);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6">Repository Comparison</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GitBranch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={owner1}
              onChange={(e) => setOwner1(e.target.value)}
              placeholder="First Repository Owner"
              className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={repo1}
              onChange={(e) => setRepo1(e.target.value)}
              placeholder="First Repository Name"
              className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GitBranch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={owner2}
              onChange={(e) => setOwner2(e.target.value)}
              placeholder="Second Repository Owner"
              className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={repo2}
              onChange={(e) => setRepo2(e.target.value)}
              placeholder="Second Repository Name"
              className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleCompare}
          disabled={loading}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Compare Repositories
        </button>
      </div>

      {stats1 && stats2 && (
        <StatsComparison stats1={stats1} stats2={stats2} repo1={`${owner1}/${repo1}`} repo2={`${owner2}/${repo2}`} />
      )}
    </div>
  );
}