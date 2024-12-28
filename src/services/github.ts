export interface RepoStats {
    commitsCount: number;
    prsCount: number;
    issuesCount: number;
    contributorsCount: number;
    lastUpdated: string;
  }
  
  export async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    try {
      const response = await fetch(
        `http://localhost:8080/api/stats?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch repository statistics: ${errorText || `Status ${response.status}`}`
        );
      }
  
      const data = await response.json();
      
      if (!isValidRepoStats(data)) {
        throw new Error('Invalid response format from API');
      }
  
      return data;
    } catch (error) {
      throw error instanceof Error 
        ? error 
        : new Error('An unexpected error occurred while fetching repository statistics');
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