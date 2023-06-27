/**
 * List of repositories to fetch in `getServerSideProps`
 */
export const repositories = [
  'nguyenvukhang/uni',
  'nguyenvukhang/site',
  'nguyenvukhang/gitnu',
  'nguyenvukhang/nvim-toggler',
]

/**
 * Fetch data on one repo
 */
async function fetchRepo(repo: string): Promise<RepositoryProps> {
  const github_token = process.env['GITHUB_TOKEN']
  if (!github_token) throw new Error('Github token not found in .env')
  const keys = [
    'html_url',
    'language',
    'stargazers_count',
    'forks_count',
    'description',
    'name',
    'full_name',
  ]

  return fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Authorization: `token ${github_token}` },
  })
    .then((r) => r.json())
    .then((r) => keys.reduce<any>((a, x) => ((a[x] = r[x]), a), {}))
}

/**
 * Fetches information on GitHub repositories supplied.
 * Each entry should be "<user>/<repository>"
 *
 * Example:
 * fetchRepos(["vercel/next.js", "neovim/neovim"])
 */
export async function fetchRepos(
  repoList: string[]
): Promise<Record<string, RepositoryProps>> {
  return Promise.all(
    repoList.map((repo) =>
      fetchRepo(repo).then((data) => ({ name: repo, data }))
    )
  ).then((res) => {
    const result: Record<string, RepositoryProps> = {}
    res.forEach(({ name, data }) => (result[name] = data))
    return result
  })
}

export type RepositoryProps = {
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  description: string
  name: string
  full_name: string
}
