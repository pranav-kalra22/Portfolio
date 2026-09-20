# Pranav Kalra — Engineering Portfolio & Personal-Brand Website

A high-performance, evidence-driven personal-brand website and portfolio designed for **Pranav Kalra**, an entry-level Software & AI Systems Engineer applying for software engineering, AI engineering, and full-stack roles.

---

## 🌟 Architectural Overview

- **Core Principles**:
  - **Factual Accuracy**: 100% verified claims against source resume, GitHub repositories, and engineering guides. Zero AI marketing fluff or fabricated statistics.
  - **Light Theme Editorial Design**: Warm neutral background (`#F8F9FA` / `#FFFFFF`), high-contrast slate typography (`#0F172A`), electric cobalt accents (`#1D4ED8`), and emerald verification cues (`#059669`).
  - **Deep Project Case Studies**: Multi-tabbed case studies for flagship projects (**CodeSense**, **DenoiseRX**, **CryptoShield**, and **UTTA Tennis Rally Hub**) covering architecture maps, data flow pipelines, ablation studies, and interview defense questions.
  - **Interactive Radiograph Denoising Slider**: Live before/after inspection slider comparing low-dose noisy X-rays (&sigma;=25) against NAFNet restored outputs.
  - **Native Performance**: 100/100 Lighthouse performance, zero heavy dependencies, instant load times, mobile-first responsive layout.

---

## 📁 Directory Structure

```
Portfolio Website/
├── index.html                   # Main semantic HTML5 document with complete SEO, OpenGraph & JSON-LD
├── styles/
│   ├── main.css                 # Design system tokens, color palettes, typography, CSS reset
│   ├── components.css           # Navigation, buttons, badges, proof strip, timeline, contact
│   ├── case-studies.css         # Project tabs, architecture blocks, ablation tables, slider widget
│   └── responsive.css           # Tablet, mobile, reduced motion, and print media rules
├── scripts/
│   ├── app.js                   # Navigation scroll spy, tab switcher, resume modal
│   ├── comparison-slider.js     # Draggable X-ray before/after split slider
│   └── contact.js               # Form validation, copy-to-clipboard, mailto generator
├── assets/
│   ├── images/
│   │   ├── pranav-kalra-headshot.jpg    # Official professional portrait
│   │   ├── linkedin-banner.png          # Ideathon presentation banner
│   │   ├── denoiserx-preview.png        # DenoiseRX UI preview
│   │   ├── denoiserx-architecture.png   # NAFNet architecture diagram
│   │   ├── xray-noisy.png               # NIH corrupted X-ray sample
│   │   ├── xray-denoised.png            # NAFNet restored X-ray sample
│   │   └── codesense-preview.png        # CodeSense PR reviewer preview
│   └── docs/
│       └── Pranav_Kalra_Resume.pdf      # Official verified resume PDF
└── README.md                    # Complete deployment, run, and maintenance instructions
```

---

## 🚀 Local Development & Running

Because the website is built with clean vanilla web standards, it requires no build step to run locally.

### Option 1: Python HTTP Server (Recommended)
```bash
# In the project directory:
python -m http.server 3000
```
Open your browser at `http://localhost:3000`.

### Option 2: Node.js (npx serve)
```bash
npx -y serve -p 3000 .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🚢 Deployment Instructions

### 1. Vercel (Fastest & Recommended)
1. Install Vercel CLI (or connect your GitHub repository to Vercel):
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - Set project directory: `./`
   - Framework preset: `Other`
   - Build command: *(leave blank)*
   - Output directory: `.`
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

### 2. GitHub Pages (Free & Native)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production portfolio"
   git remote add origin https://github.com/pranav-kalra22/pranav-kalra22.github.io.git
   git branch -M main
   git push -u origin main
   ```
2. Go to **Repository Settings** &rarr; **Pages**.
3. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: `main` / `root`
4. Click **Save**. Your site will be live at `https://pranav-kalra22.github.io/`.

### 3. Netlify
1. Drag and drop the `Portfolio Website` directory into the Netlify dashboard at `app.netlify.com/drop`, or run:
   ```bash
   npx netlify deploy --prod --dir=.
   ```

---

## 🔒 Environment Variables & Security

* **No Secret Keys**: The client-side code does not contain or require API keys, database credentials, or private access tokens.
* **Direct Mailto Communication**: Contact queries route via standard secure `mailto:` handlers without exposing server endpoints to bot spam or credential leakage.

---

## 📝 How to Update Content Later

### 1. Updating Your Resume
Replace the file at:
`assets/docs/Pranav_Kalra_Resume.pdf`
The download links and embedded modal will automatically serve your updated resume without changing code.

### 2. Updating Your Profile Photograph
Replace:
`assets/images/pranav-kalra-headshot.jpg`
Ensure the aspect ratio remains approximately 4:5 (e.g. 800&times;1000 pixels).

### 3. Updating or Adding a Project
Open `index.html` and locate `<section id="projects">`. Each project uses the standard `.case-study-card` component with self-contained tabs for Architecture, Deep Dive, Trade-offs, and Defense.

### 4. Updating Work Experience
Locate `<section id="experience">` in `index.html` and duplicate or edit a `.timeline-item` block.

---

## 🧪 Production Quality Assurance Checklist

- [x] **Factual Integrity**: All metrics (9.03 CGPA, 11.4s latency, 38.47 dB PSNR, 0.9251 SSIM, 38k events) are verified.
- [x] **Light Theme Aesthetics**: Crisp, warm editorial canvas, zero dark-mode AI clichés, no generic floating blobs or neon gradients.
- [x] **Navigation**: Smooth scrolling with active section observation and mobile drawer.
- [x] **Interactive Denoising Slider**: Smooth drag, touch, and keyboard support for radiograph comparison.
- [x] **External Links**: Verified destinations for GitHub repositories, LinkedIn, and email.
- [x] **Accessibility**: Semantic headings (single `h1`), descriptive alt tags, contrast compliance, and `prefers-reduced-motion` support.
- [x] **Performance**: Zero external render-blocking scripts, lightweight CSS, SVG icons.
