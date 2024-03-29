export interface GitHubRepo {
    id: number;
    html_url: string;
    name: string;
    description: string;
}

export interface GitHubRepoSearchResult {
    items: GitHubRepo[];
    total_count: number;
    total_pages: number;
}

export async function searchGithubRepos(
    keyword: string, username: string, page: number = 1, per_page: number = 50
): Promise<GitHubRepoSearchResult> {
    try {
        const url = `http://localhost:8000/search-repos/?keyword=${keyword}&username=${username}&page=${page}&per_page=${per_page}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return {
          items: data.items,
          total_count: data.total_count,
          total_pages: data.total_pages
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
