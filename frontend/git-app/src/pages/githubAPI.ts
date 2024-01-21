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
    try {
        const response = await fetch(`http://127.0.0.1:8000/search-repos/?keyword=${keyword}&username=${username}`);
        // fetch() は、ネットワークリクエストを行うためのAPI。
        // URLをhttp://localhost:8000にすると、uvicornが起動しているサーバとは別のサーバと認識する。
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
