```
  ____                  ____                     
 |  _ \ __ _ _ __ ___  |  _ \  _____   _____ ___ 
 | |_) / _` | '__/ _ \ | | | |/ _ \ \ / / __/ __|
 |  _ < (_| | | |  __/ | |_| |  __/\ V /\__ \__ \
 |_| \_\__,_|_|  \___| |____/ \___| \_/ |___/___/
                                                 
       - P R O D U C T - D R I V E N  S T U D I O -
```

# Rare Devs Website

A modern web presence for **Rare Devs**, showcasing our services, team, portfolio, and company culture. Designed to balance complex, high-performance logic with fluid, immersive visual animations.

---

## About Rare Devs

### Who We Are
Rare Devs is a forward-thinking, product-driven creative technology studio focusing on designing and developing seamless, high-performance digital experiences. 

### What Problems We Solve
We bridge the gap between heavy, bulletproof engineering and fluid, interactive visual layouts. We turn static web interfaces into dynamic, breathing digital systems that work beautifully across all screen dimensions.

### Mission & Vision
- **Mission**: To build digital products that feel natural, seamless, and intuitive, guiding users effortlessly through every interaction.
- **Vision**: To set the standard for high-end creative coding, combining artistic aesthetic grid structures with bulletproof serverless architectures.

---

## Features

- **Responsive Grid Design**: A sleek, adaptive interface that fits perfectly from mobile screens to ultra-wide displays.
- **Service Pages**: Interactive guides showcasing our design and development capabilities.
- **Team Showcase**: The Core Crew Registry utilizing responsive card-tilt mechanics and layout positioning.
- **Interactive Portfolio**: Sleek case studies and highlighted missions that reveal on-scroll.
- **Serverless Contact Form**: Dynamic contact inputs backed by GSAP shake validations and serverless routing.
- **Dynamic Careers & Routine Slider**: An on-scroll horizontal tech-stack track displaying our workspace routines.

---

## Tech Stack

### Frontend
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) HTML5
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) CSS3 (Vanilla design tokens & layouts)
- ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) Vanilla ES Modules
- ![GSAP](https://img.shields.io/badge/GSAP-GreenSock-green?style=for-the-badge&logo=greensock&logoColor=white) GreenSock Motion Engine
- ![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-blueviolet?style=for-the-badge) Smooth Scroll Engine
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) Vite Compilation

### Backend & API
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) Serverless Mail Route Handler
- ![Resend](https://img.shields.io/badge/Resend-Email%20API-orange?style=for-the-badge) Resend Email Dispatcher API

### Deployment
- ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) Vercel Serverless Platform

---

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm 9+

### Installation
Clone the repository and install dependencies using `pnpm`:
```bash
pnpm install
```

### Development
Boot the Vite dev server with live hot-reloading:
```bash
pnpm dev
```

### Production Build
Compile and bundle static index files, assets, and stylesheets:
```bash
pnpm build
```

---

## Project Structure

```text
GridFolio/
├── 📂 api/                   # Serverless execution layer
│   └── 📄 send-email.js      # Resend API mail routing gateway
├── 📂 js/                    # Client interface dynamics
│   ├── 📄 contact-form.js    # Contact validation & GSAP animations
│   ├── 📄 observatory.js     # Tech carousel scroll animation
│   └── 📄 home.js            # Home page interactions
├── 📂 css/                   # Responsive typography & layouts
│   ├── 📄 home.css           # Home page styling
│   ├── 📄 observatory.css    # Dynamic carousel stylesheets
│   └── ...
├── 📂 public/                # Static public assets
├── 📄 index.html             # Homepage layout
├── 📄 about.html             # About page layout
├── 📄 services.html          # Services page layout
├── 📄 projects.html          # Projects page layout
├── 📄 contact.html           # Contact page layout
├── 📄 globals.css            # Root design system tokens & colors
└── 📄 vite.config.js         # Multi-page Vite compilation config
```

---

## Environment Variables

To configure form submissions, create a `.env` file in the root directory:
```env
RESEND_API_KEY=re_your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_inbox@domain.com
```

---

## Design System

### Colors
- **Main Background**: Sleek dark space (`--base-400: #141414`)
- **Primary Accent**: Immersion Orange (`--base-500: #ee6436`)
- **Primary Typography**: Cream Off-White (`--base-100: #f2eeda`)
- **Muted Text**: Medium Grey (`--base-200: #8c8a7f`)

### Typography
- **Display Headlines**: Set in **SCHABO** display font for heavy visual weight.
- **Mono Details**: Styled in **Geist Mono** for structural technical text.
- **Body Copy**: Responsive clamp layouts for optimal readability.

### Spacing & Layout
- Rigid grid lines created using CSS grid overlays and absolute positioning.
- Clamp-based fluid gutters (`1.5rem` to `4rem`) ensuring breathing room across viewport shifts.

---

## Contributing

### Branch Naming
- Features: `feature/feature-name`
- Bugfixes: `bugfix/issue-description`
- Hotfixes: `hotfix/quick-fix`

### Commit Conventions
Follow Conventional Commits guidelines:
- `feat: add card stage overlays`
- `fix: scope home card-flip animation`
- `style: format observatory buttons`

### Pull Request Process
1. Clean commit messages on a fresh topic branch.
2. Run `pnpm build` to verify the Vite package compiles cleanly.
3. Open a detailed PR explaining the layout, animation, or API updates.

---

## License

This project is licensed under the **ISC License**.

---

## Maintainers

- **Rare Devs** — [raredevs.tech](https://raredevs.tech)
