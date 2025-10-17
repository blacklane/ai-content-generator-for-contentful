# Blacklane's Contentful AI Page Generator

## ✨ Features

- **🤖 Advanced AI Content Generation** - Generate hero sections, FAQs, SEO text using Blacklane's specialized AI models
- **⚛️ Modern React Architecture** - Built with Next.js App Router and React Server Components
- **🎨 Professional Dark UI** - Modern, responsive interface with Tailwind CSS + DaisyUI
- **🌍 Multi-language Support** - Content generation in English, Spanish, German, French
- **📦 Direct Contentful Publishing** - Seamless integration with Contentful CMS
- **🔐 JWT Authentication** - Secure login with persistent sessions
- **🎯 Component-Based Architecture** - Modular React components with TypeScript

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Blacklane AI Integration
AI_API_KEY=sk-your_blacklane_api_key_here
AI_BASE_URL=https://ai-chat.blacklane.net/api/v1
AI_MODEL_ID=seo-landing-page-generator

# Contentful CMS Integration
CONTENTFUL_SPACE_ID=your_contentful_space_id_here
CONTENTFUL_ENVIRONMENT_ID=alex-suprun-dev-new
CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_management_api_token_here

# Authentication
AUTH_USERNAME=admin
AUTH_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nextJS/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── generate/     # Content generation
│   │   │   ├── publish/      # Contentful publishing
│   │   │   └── health/       # System health check
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Main application page
│   │   └── globals.css       # Global styles
│   ├── components/            # React Components
│   │   ├── LoginForm.tsx     # Authentication form
│   │   ├── Sidebar.tsx       # Progress sidebar
│   │   ├── StepOne.tsx       # Topic & Goals
│   │   ├── StepTwo.tsx       # Component selection
│   │   ├── StepThree.tsx     # Content preview
│   │   ├── StepFour.tsx      # Deployment config
│   │   └── StepFive.tsx      # Final publish
│   ├── lib/                   # Utilities
│   │   └── auth/             # Authentication utilities
│   ├── contentful/           # Contentful integration (copied as-is)
│   ├── ai/                   # AI client (copied as-is)
│   ├── constants.ts          # Application constants
│   ├── types/                # TypeScript types
│   └── validation/           # Validation schemas
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind CSS config
└── next.config.js            # Next.js config
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev                 # Start development server (port 3000)

# Production
npm run build              # Build for production
npm start                  # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run type-check         # TypeScript type checking
```

## 🎯 How It Works

### Step-by-Step Workflow

1. **🔐 Login** - Authenticate with username/password
2. **📝 Topic & Goals** - Define keywords, language, and questions
3. **🧩 Select Components** - Choose Hero, FAQs, SEO Text components
4. **🤖 Generate Content** - AI creates structured, SEO-optimized content
5. **⚙️ Configure Deployment** - Set release title and publishing options
6. **📤 Upload to Contentful** - Publish as draft to Contentful CMS

### Example Workflow

**Input:**
```
Main Keywords: "Premium Airport Transfer Service"
Secondary Keywords: "luxury, professional, reliable transport"
Language: English
Components: Hero + FAQ + SEO Text
```

**AI-Generated Output:**
```json
{
  "hero": {
    "heading": "Experience Premium Airport Transfers",
    "subheading": "Professional chauffeurs, luxury vehicles",
    "ctaText": "Book Your Ride",
    "ctaTargetLink": "/booking"
  },
  "faqs": {
    "items": [
      {
        "question": "What makes your service premium?",
        "answer": "Our professional chauffeurs..."
      }
    ]
  },
  "seoText": {
    "title": "Luxury Airport Transfer Services",
    "content": "Experience the finest in airport transportation..."
  }
}
```

## 🔧 Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** Tailwind CSS + DaisyUI
- **Authentication:** JWT with bcrypt
- **Validation:** Zod schemas
- **HTTP Client:** Axios
- **AI Integration:** Blacklane AI API
- **CMS:** Contentful Management API

## 🌟 Key Differences from Original

This Next.js version improves upon the original in several ways:

1. **React-Based UI** - Modern component-based architecture vs vanilla JavaScript
2. **App Router** - Next.js 14 App Router with server components and API routes
3. **Type Safety** - Full TypeScript coverage with proper types
4. **Better State Management** - React hooks for cleaner state handling
5. **Server-Side API** - API routes run on the server for better security
6. **Optimized Performance** - Next.js optimizations and code splitting

## 🔒 Security

- JWT tokens for authentication (stored in localStorage)
- Password hashing with bcrypt
- API route protection with token verification
- Environment variables for sensitive data

## 📝 Environment Variables

All required environment variables are documented in `.env.example`:

- **AI_API_KEY** - Blacklane AI API key
- **AI_BASE_URL** - AI API endpoint
- **AI_MODEL_ID** - AI model identifier
- **CONTENTFUL_SPACE_ID** - Contentful space ID
- **CONTENTFUL_ENVIRONMENT_ID** - Contentful environment
- **CONTENTFUL_MANAGEMENT_TOKEN** - Contentful management API token
- **AUTH_USERNAME** - Admin username
- **AUTH_PASSWORD** - Admin password
- **JWT_SECRET** - Secret key for JWT signing

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

