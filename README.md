# Inboxly 
### AI-Powered Email Management Agent

Inboxly is an AI-powered email management application designed to reduce inbox overload by helping users identify important emails, understand messages faster, and prioritize what needs their attention.

Instead of treating every email equally, Inboxly aims to combine AI-generated insights with personalized prioritization based on user behavior, helping users focus on emails that matter most.

## Features

- **Google Authentication** — Sign in securely using Google OAuth.
- **Gmail Integration** — Connect to Gmail and retrieve email messages through the Gmail API.
- **Personalized Email Prioritization** — Use behavioral signals such as read, replied, ignored, and marked-important emails to inform priority scoring.
- **AI-Powered Summarization** — Generate concise summaries of emails using the Groq API.
- **Email Management** — Organize and review messages with a focus on important and actionable emails.
- **Secure Authentication** — Use JWT-based authentication with HTTP-only cookies to authenticate application requests.
- **Database Management** — Use PostgreSQL and Prisma to manage application users and connected Google accounts.
- **Efficient Data Retrieval** — Support paginated email retrieval and caching to reduce unnecessary repeated requests.

##  Tech Stack

| Layer | Technologies |
|---|---|
| Frontend -> React,Vite, Axios, React Router |
| Backend -> Node.js, Express.js |
| Authentication->| Google OAuth 2.0, JWT, HTTP-only cookies |
| Email Integration -> Gmail API, googleapis |
| Database -> PostgreSQL, Prisma ORM |
| AI ->Groq API |
| Performance->|NodeCache, rate limiting |
| Deployment -> Vercel(frontend), Render (backend) |

##  Architecture

```text
React Frontend
      |
      | Axios requests
      v
Express Backend
      |
      +---- JWT Authentication Middleware
      |
      +---- Google OAuth / Gmail Integration
      |             |
      |             v
      |         Gmail API
      |
      +---- Email Prioritization Service
      |             |
      |             v
      |       User Behavior Signals
      |
      +---- AI Summarization Service
      |             |
      |             v
      |          Groq API
      |
      +---- Prisma ORM
                    |
                    v
                PostgreSQL
```

##  How Inboxly Works

### 1. Authentication and Gmail Access

Users authenticate through Google OAuth. The backend obtains the required Google credentials, identifies the application user, and maintains application authentication using a JWT stored in an HTTP-only cookie.

Google credentials are managed separately from the application's JWT, allowing the backend to authenticate Gmail API requests for the connected account.

### 2. Personalized Email Prioritization

Inboxly is designed to learn from user interaction patterns, including:

- Emails the user reads.
- Emails the user replies to.
- Emails the user ignores.
- Emails the user considers important.

These behavioral signals can be used to calculate personalized priority scores, helping surface messages that are more likely to need attention.

### 3. AI-Powered Summarization

Inboxly uses the Groq API to generate concise summaries of email content, reducing the time users spend opening and reading lengthy messages.

### 4. Efficient Email Retrieval

Email retrieval can involve pagination, temporary caching, and selective data processing to avoid unnecessary API calls and improve responsiveness.

##  Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL
- A Google Cloud project with the Gmail API enabled
- Google OAuth 2.0 credentials
- A Groq API key
  
###  Demo Account

Explore Inboxly using the demo login without connecting your personal Gmail account.

- **Demo access:** Available through the demo login option in the application.
- **Data:** Uses sample email data to demonstrate inbox prioritization and AI-powered summaries.

*Note: Demo access and sample data must be configured in the application before these features can be used.*

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Inboxly
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8080
DATABASE_URL="your_postgresql_connection_string"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_REDIRECT_URI="http://localhost:8080/auth/google/callback"
JWT_SECRET="your_jwt_secret"
GROQ_API_KEY="your_groq_api_key"
```

Configure the Google OAuth consent screen and authorized redirect URI to match your environment.

Run your Prisma migrations and generate the Prisma client using the scripts configured in your project.

Start the backend using the appropriate script from `package.json`.

### 3. Set up the frontend

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL="http://localhost:8080"
```

Start the Vite development server using your configured npm script.

### 4. Open the application

Visit the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Use Google sign-in to authenticate and connect the application to the appropriate Gmail account.

> **Note:** Folder names and npm scripts may differ depending on your repository. Configure the Google OAuth redirect URI, Gmail API permissions, database connection, and cookie settings for your local or deployed environment. Never commit `.env` files or expose OAuth secrets, JWT secrets, or API keys.

## Security Considerations

- Keep application JWTs in HTTP-only cookies rather than exposing them to frontend JavaScript.
- Keep Google access and refresh tokens on the backend.
- Request only the Google permissions needed by the application.
- Validate authenticated requests through backend middleware.
- Store secrets in environment variables.
- Protect email content and user-specific data from unauthorized access.

##  Future Enhancements

- AI-driven email classification and categorization.
- Detection of emails requiring a reply or follow-up.
- Extraction of deadlines, tasks, and action items.
- Personalized priority scoring that improves with user feedback.
- Improved background processing for large inboxes.
- User-configurable prioritization rules.

##  Project Goal

Inboxly explores how full-stack development, Gmail API integration, behavioral analysis, and generative AI can work together to solve a practical productivity problem: **reducing email overload and helping users focus on what deserves their attention.**

---

Built with React, Node.js, PostgreSQL, and AI.
