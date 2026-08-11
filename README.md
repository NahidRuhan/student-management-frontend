# EduAyna - Student Management Frontend

This is the frontend application for the **EduAyna Student Management Dashboard**, built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and **Redux Toolkit**.

## Features
- **Next.js 16**: Utilizing the modern App Router architecture.
- **Tailwind CSS v4**: Fully custom theme featuring modern aesthetic design tokens.
- **Redux Toolkit & RTK Query**: Robust state management and declarative data fetching with cache invalidation.
- **Custom UI Components**: Built from scratch using `clsx` and `tailwind-merge` (Button, Modal, Table, Select, Input, Badge).
- **Lucide Icons**: Beautiful, consistent vector icons.
- **Responsive Design**: Fully usable on mobile, tablet, and desktop viewports.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Ensure the **EduAyna Backend** is running on `http://localhost:4000`

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```
*(Note: The Next.js config includes an API rewrite `source: '/api/v1/:path*'`, so requests are securely proxied to the backend during development.)*

### 4. Running the App
```bash
# Development
npm run dev

# Production
npm run build
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

## Project Structure
- `src/app`: Next.js App Router pages and layouts
- `src/components/ui`: Reusable primitive UI components
- `src/components/students`: Feature-specific components (Forms, Tables, Filters)
- `src/store`: Redux Toolkit setup and RTK Query API slices
- `src/types`: Shared TypeScript definitions
- `src/lib`: Utilities (`cn` for Tailwind class merging)
