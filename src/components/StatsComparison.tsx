import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RepoStats } from '../services/github';

interface StatsComparisonProps {
  stats1: RepoStats;
  stats2: RepoStats;
  repo1: string;
  repo2: string;
}

export function StatsComparison({ stats1, stats2, repo1, repo2 }: StatsComparisonProps) {
  const data = [
    {
      name: 'Commits',
      [repo1]: stats1.commitsCount,
      [repo2]: stats2.commitsCount,
    },
    {
      name: 'Pull Requests',
      [repo1]: stats1.prsCount,
      [repo2]: stats2.prsCount,
    },
    {
      name: 'Issues',
      [repo1]: stats1.issuesCount,
      [repo2]: stats2.issuesCount,
    },
    {
      name: 'Contributors',
      [repo1]: stats1.contributorsCount,
      [repo2]: stats2.contributorsCount,
    },
  ];

  return (
    <div className="mt-8 bg-gray-900/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Repository Comparison Chart</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6',
              }}
            />
            <Legend />
            <Bar dataKey={repo1} fill="#3B82F6" />
            <Bar dataKey={repo2} fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}