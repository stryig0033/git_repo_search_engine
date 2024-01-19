// GitHubリポジトリの型定義
// interface は、TypeScriptにおいてオブジェクトの形状（つまり、どのようなプロパティやメソッドを持っているか）を定義するために使用される構文です。
//　これはコマンドではなく、TypeScriptの型システムの一部で、オブジェクトの型を定義するために使います。
export interface GitHubRepo {
    id: number;
    html_url: string;
    name: string;
    description: string;
  }

  export async function searchGithubRepos(keyword: string, username: string): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/search/repositories?q=${keyword}+user:${username}&per_page=50`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('GitHub API call failed');
    }
    const data = await response.json();
    return data.items as GitHubRepo[];
  }