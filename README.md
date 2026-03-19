# GitHub AI Code Reviewer

An automated code review tool that integrates with GitHub pull requests. When a PR is opened or updated, it fetches the diff, sends it to Anthropic Claude API for analysis, and posts a review comment on the PR. All reviews are logged to a PostgreSQL database and displayed in a real-time dashboard.

## Features

- Automatic PR review on every push
- AI-powered feedback via Claude API — flags bugs, security issues, and suggests improvements
- Automatic review comments posted on the PR conversation
- Dashboard showing past reviews repo analytics
- Filter reviews by repo name and date range
- Webhook signature verification for security
- Rate limiting on API endpoints
- CI pipeline via Github Actions
- Fully containerised with Docker and deployed on Railway


## Tech stack

Backend: Node.js + Typescript

Framework: Express

AI
Anthropic Claude API

Github Integration: Octokit

Frontend: React + Typescript + Vite

Styling: TailWind CSS

Charts: Rechart

Deployment: Railway

CI: Github Actions


## Architecture
```
GitHub PR opened/updated
        ↓
GitHub sends webhook POST to /webhook
        ↓
Server verifies HMAC-SHA256 signature
        ↓
Octokit fetches the PR diff
        ↓
Diff sent to Claude API with structured prompt
        ↓
Review parsed and posted as PR comment via Octokit
        ↓
Review logged to PostgreSQL
        ↓
Dashboard reads from /api/reviews and /api/stats
```

## Local setup

**Prerequisites**
- Node.js v20+
- Docker Desktop
- ngrok account (for webhook testing)

**1. Clone the repo**
```bash
git clone https://github.com/your-username/ai-code-reviewer.git
cd ai-code-reviewer
```

**2. Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

**3. Create `.env` in the project root**
```
ANTHROPIC_API_KEY=your_key
GITHUB_TOKEN=your_token
GITHUB_WEBHOOK_SECRET=your_secret
DATABASE_URL=postgresql://code-reviewer:code-reviewer-123@localhost:5433/code-reviewer-db
PORT=3000
```

**4. Start Postgres**
```bash
docker-compose up -d postgres
```

**5. Start the backend**
```bash
npm run dev
```

**6. Start the frontend**
```bash
cd client && npm run dev
```

**7. Expose your server with ngrok**
```bash
ngrok http 3000
```

Visit `http://localhost:5173` for the dashboard.

---

## Adding it to your repo
1. Go to your GitHub repo → Settings → Webhooks → Add webhook
2. Payload URL: `https://ai-code-reviewer-production-9d7f.up.railway.app/webhook`
3. Content type: `application/json`
4. Secret: your `GITHUB_WEBHOOK_SECRET` value
5. Events: select "Pull requests" only

## Dashboard
![Dashboard Screenshot](assets/dashboard.png)