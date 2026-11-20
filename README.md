# HackVault ⚡

### Student Hackathon Problem & Solution Discovery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

> **HackVault** is a student-first discovery and architectural research platform that bridges the gap between hackathon problem statements and real, working open-source solutions. It saves engineering teams hundreds of research hours by helping them understand past challenges, examine winning source code, and identify unaddressed edge cases before starting their own projects.

---

## 📌 Problem Statement

Every year, thousands of students compete in hackathons like **Smart India Hackathon (SIH)**, **KAVACH**, and global collegiate hackathons on **Devfolio**, **Devpost**, and **Unstop**. However, students face severe bottlenecks:

1. **Dense Government Statements**: Problem statements issued by government ministries and public bodies are often loaded with complex administrative jargon, making it difficult for beginners to grasp the fundamental engineering requirements.
2. **Reinventing the Wheel**: Students frequently spend weeks building basic prototypes that have already been solved by multiple previous teams, lacking insight into what has already been proven.
3. **Missing or Broken Repositories**: Most hackathon announcement portals only display titles and dates; finding verified public GitHub repositories, working prototypes, and presentation decks of past winners is fragmented and frustrating.
4. **Lack of Critical Analysis**: Teams struggle to identify where previous solutions fell short and where jury evaluation criteria offer opportunities to stand out and win.

---

## 💡 Proposed Solution

**HackVault** transforms hackathon preparation from guesswork into structured discovery:

- **Bilingual Plain-Language Explanations**: Converts bureaucratic problem statements into concise English and colloquial **தமிழ் / Tanglish**, enabling South Indian and national student teams to immediately grasp the core problem.
- **Verified Working Repositories**: Curates authentic, publicly accessible GitHub repositories, live prototypes, recorded video demos, and slide presentations. No fake links or hallucinated statistics.
- **Side-by-Side Project Comparison**: An interactive matrix that compares 2 to 4 projects across architectural approaches, technologies, features, and public limitations.
- **Semantic Cross-Hackathon Matcher**: Allows students to paste any new or upcoming hackathon problem statement to discover similar challenges from past hackathons and uncover existing code implementations.
- **Winning Angles ("How to Beat Previous Winners")**: Highlights documented limitations of previous solutions (e.g. lack of offline edge computing, sensor drift, missing vernacular audio) so students can design a winning submission.

---

## 🚀 Main Features

### 1. 🔍 Problem Statement Explorer
- **Multi-Filter Engine**: Filter problem statements by Year, Domain (Healthcare, Agriculture, Transportation, Cybersecurity, Clean Tech, etc.), Hackathon Name, Category (*Software / Hardware / Both*), and Difficulty.
- **Bilingual English & Tanglish Toggles**: Interactive pill that switches between simplified English and Tanglish explanations with zero reload delay.
- **Jury & Deliverables Checklist**: Concrete, numbered milestones expected by hackathon evaluation juries.

### 2. 💻 Existing Solutions & Repositories
- **Verified Status Badges**: Distinct badges for *Winner (1st Place)*, *Runner Up (2nd Place)*, *Finalist*, and *Verified Public Submission*.
- **Working External Links**: Direct links to real GitHub source code, live web applications, Loom/YouTube demos, and slide decks.
- **Architectural Approaches & Limitations**: Explains the technical architecture (e.g., YOLOv8 edge inference, LoRa mesh networks, MediaPipe) and public limitations to learn from.

### 3. ⚖️ Project Comparison Matrix
- **Comparative Evaluation**: Side-by-side table comparing features, technology stacks, hardware requirements, and documented shortcomings.
- **AI & Heuristic Synthesis**: Synthesizes divergence and winning strategies while strictly distinguishing verified repository facts from analytical evaluation.
- **Markdown Export**: 1-click export of comparison reports (`.md`) ready for hackathon PPTs.

### 4. 🔮 Similar Problem & Semantic Matcher
- **Cross-Hackathon Matching**: Paste any upcoming hackathon challenge or pick an existing problem to find related previous challenges.
- **Explainable Match Scores**: Computes semantic similarity (0–100%) and provides clear reasons for the match.
- **Instant Solution Access**: Surfaces existing repositories from those matched challenges immediately.

### 5. 📑 Personal Research Workspace ("My Saved")
- **Shortlist Collections**: Bookmark problem statements and save reference codebases.
- **Team Scratchpad**: Auto-saving local notes for team brainstorming on how to tackle each problem.
- **Portfolio Export**: Export shortlisted problems and notes as a unified Markdown research brief.

### 6. 🛠️ Curator Admin Portal
- **Local Sandbox & Demo Mode**: Add/Edit/Delete problem statements, hackathon editions, and project solutions with real URLs.
- **JSON Backup & Restore**: Full JSON database import and export capabilities.

### 7. 🤖 Dual-Engine AI Architecture
- **Built-in Heuristic Engine**: Fast, deterministic, 100% offline intelligence requiring zero configuration or API keys.
- **Google Gemini 1.5 Flash (Optional BYOK)**: Integrated modal in Settings allowing students to supply an optional Gemini API key stored strictly in private browser localStorage.

---

## 🛠️ Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 18 (TypeScript) | Fast, modular component architecture |
| **Bundler & Build Tool** | Vite 6 | Instant HMR and optimized production bundling |
| **Styling & Design** | Tailwind CSS | Clean, responsive design with Deep Navy & Blue accents |
| **Icons** | Lucide React | Modern, accessible iconography |
| **Persistence** | Browser LocalStorage | Zero-dependency local persistence with Supabase-ready schema |
| **AI Integration** | Google Gemini API + Heuristic Engine | Dual-mode generative & heuristic problem breakdown |

---

## 📸 Screenshots

### 1. Home Page & Discovery Hero
![Home Page](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80)
*Modern landing page with multi-domain discovery, recent problem statements, and verified winning projects.*

### 2. Problem Statement Explorer with Tanglish Toggle
![Problem Explorer](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)
*Advanced multi-facet search with real-time English and தமிழ் / Tanglish simplified explanation switcher.*

### 3. Project Comparison Matrix
![Project Comparison](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80)
*Side-by-side comparison matrix evaluating architecture, tech stacks, and limitations.*

---

## 💻 Installation and Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/HackVault.git
cd HackVault
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be created inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔒 Security & Privacy

- **No Secrets in Code**: HackVault contains zero hardcoded API keys, passwords, or private environment variables.
- **Client-Side Privacy**: If a user supplies a Google Gemini API key in the Settings modal, it is stored strictly in the browser's private `localStorage` and is never transmitted to any third-party server.
- **Source Integrity**: All seed data is compiled from public, open-access hackathon portals (Smart India Hackathon, BPR&D, Devfolio, Google Developer Student Clubs).

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
