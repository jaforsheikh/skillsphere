# 🎓 SkillSphere — Online Learning Platform

SkillSphere is a modern online learning platform built with **Next.js**, **MongoDB**, and **Better Auth**.  
It helps users explore courses, learn from expert instructors, register/login securely, and manage their learning profile.

---

## 🚀 Live Demo

🌐 **Live Website:** https://skillsphere-xi.vercel.app

---

## ✨ Key Features

- 🔐 User registration and login system
- 🌐 Google OAuth authentication
- 👤 Protected user profile page
- 📚 Course listing and course details
- 🧑‍🏫 Instructor section with professional cards
- 🪟 Instructor detail modal
- 📱 Responsive design for desktop, tablet, and mobile
- 🎨 Modern dark UI with blue accent branding
- ⚡ Fast performance with Next.js App Router
- 🗄️ MongoDB database integration
- 🔒 Secure environment variable based configuration
- 🚀 Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend & Backend Framework |
| React | UI Components |
| Tailwind CSS | Styling |
| MongoDB | Database |
| Better Auth | Authentication |
| Google OAuth | Social Login |
| Vercel | Deployment |
| GitHub | Version Control |

---

## 📁 Project Structure

```bash
skillsphere/
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...all]/
│   │   │   ├── courses/
│   │   │   ├── instructors/
│   │   │   └── upload/
│   │   │
│   │   ├── components/
│   │   ├── courses/
│   │   ├── login/
│   │   ├── privacy/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── terms/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── not-found.js
│   │   └── page.js
│   │
│   ├── data/
│   │   ├── courses.json
│   │   └── instructors.json
│   │
│   └── lib/
│       ├── auth.js
│       ├── auth-client.js
│       └── mongodb-client.js
│
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
