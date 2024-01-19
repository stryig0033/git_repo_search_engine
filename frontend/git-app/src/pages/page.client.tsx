// pages/index.tsx
import { useState } from 'react';
import { searchGithubRepos, GitHubRepo } from './githubAPI'

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const handleSearch = async () => {
    try {
      const result = await searchGithubRepos(keyword, username);
      setRepos(result);
    } catch (error) {
      console.error(error);
      // 適切なエラーハンドリングを行う
    }
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Keyword" />
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name} 
            </a>
            <a>{repo.description}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

