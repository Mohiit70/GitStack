export interface RepoStats {
  commitsCount: number;
  prsCount: number;
  issuesCount: number;
  contributorsCount: number;
  lastUpdated: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
  try {
    const cleanOwner = owner.trim();
    const cleanRepo = repo.trim();
    
    if (!cleanOwner || !cleanRepo) {
      throw new Error('Owner and repository names are required');
    }

    const response = await fetch(
      `${API_BASE_URL}/api/stats?owner=${encodeURIComponent(cleanOwner)}&repo=${encodeURIComponent(cleanRepo)}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch repository data: ${errorText || `Status ${response.status}`}`
      );
    }

    const data = await response.json();
    
    if (!isValidRepoStats(data)) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching repository data');
  }
}

function isValidRepoStats(data: any): data is RepoStats {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.commitsCount === 'number' &&
    typeof data.prsCount === 'number' &&
    typeof data.issuesCount === 'number' &&
    typeof data.contributorsCount === 'number' &&
    typeof data.lastUpdated === 'string'
  );
}