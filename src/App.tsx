import { useState, useEffect, useCallback } from 'react';
import { Github, GitPullRequest, GitCommit, CircleDot } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { SearchBar } from './components/SearchBar';
import { ErrorMessage } from './components/ErrorMessage';
import { fetchRepoStats, RepoStats } from './services/github';

function App() {
  const [owner, setOwner] = useState('daytonaio');
  const [repo, setRepo] = useState('daytona');
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Github className="h-8 w-8" />
                GitHub Activity Dashboard
              </h1>
              <SearchBar
                owner={owner}
                repo={repo}
                onOwnerChange={setOwner}
                onRepoChange={setRepo}
                onRefresh={fetchStats}
                loading={loading}
              />
            </div>

            {error && (
              <ErrorMessage 
                message={error} 
                onDismiss={() => setError('')}
              />
            )}

            {stats && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;