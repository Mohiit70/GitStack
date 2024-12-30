import { useState, useCallback } from 'react';
import { Github, GitPullRequest, GitCommit, CircleDot, ChevronDown,} from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { StatsCard } from './components/StatsCard';
import { ErrorMessage } from './components/ErrorMessage';
import { ComparisonView } from './components/ComparisonView';
import { fetchRepoStats, RepoStats } from './services/github';

function App() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [comparisonStats1, setComparisonStats1] = useState<RepoStats | null>(null);
  const [comparisonStats2, setComparisonStats2] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const fetchStats = useCallback(async () => {
    if (!owner.trim() || !repo.trim()) {
      setError('Please enter both owner and repository names');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchRepoStats(owner, repo);
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching repository data');
    } finally {
      setLoading(false);
    }
  }, [owner, repo]);

  const handleCompare = async (owner1: string, repo1: string, owner2: string, repo2: string) => {
    if (!owner1.trim() || !repo1.trim() || !owner2.trim() || !repo2.trim()) {
      setError('Please enter both owner and repository names for comparison');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const [data1, data2] = await Promise.all([
        fetchRepoStats(owner1, repo1),
        fetchRepoStats(owner2, repo2),
      ]);
      setComparisonStats1(data1);
      setComparisonStats2(data2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while comparing repositories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4 inline-flex items-center">
              <Github className="h-12 w-12 mr-4" />
              Gitstack
            </h1>
            <p className="text-xl text-gray-300">Track and analyze GitHub repository metrics in real-time</p>
          </header>

          <div className="bg-gray-800/30 rounded-2xl p-8 backdrop-blur-lg shadow-xl">
            <SearchBar
              owner={owner}
              repo={repo}
              onOwnerChange={setOwner}
              onRepoChange={setRepo}
              onRefresh={fetchStats}
              loading={loading}
            />

            {error && (
              <ErrorMessage 
                message={error} 
                onDismiss={() => setError('')}
              />
            )}

            {stats && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard
                    title="Commits"
                    value={stats.commitsCount}
                    Icon={GitCommit}
                    color="blue"
                  />
                  <StatsCard
                    title="Pull Requests"
                    value={stats.prsCount}
                    Icon={GitPullRequest}
                    color="green"
                  />
                  <StatsCard
                    title="Issues"
                    value={stats.issuesCount}
                    Icon={CircleDot}
                    color="purple"
                  />
                  <StatsCard
                    title="Contributors"
                    value={stats.contributorsCount}
                    Icon={Github}
                    color="orange"
                  />
                </div>
                <div className="text-right text-gray-400 text-sm">
                  Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
              <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform ${showComparison ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showComparison && (
            <ComparisonView
              onCompare={handleCompare}
              loading={loading}
              stats1={comparisonStats1}
              stats2={comparisonStats2}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

