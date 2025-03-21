const fetchGitHubUsername = async () => {
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${process.env.GH_TOKEN}` },
    next: { tags: ["github", "github-username"] },
  });

  if (!res.ok) {
    console.error("Failed to fetch GitHub username:", res.statusText);
    return ""; // Fallback value to avoid build failure
  }

  const data = await res.json();
  return data.login || "";
};

/** @type {import('next').NextConfig} */
const nextConfig = async () => ({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    staleTimes: { dynamic: 300, static: 300 },
  },
  env: {
    GITHUB_USERNAME: await fetchGitHubUsername(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.github.com" },
      { protocol: "https", hostname: "turbo.build" },
    ],
  },
});

export default nextConfig();
