# Lawrence Energy Services Limited (LESL)
## Official Production Web Platform & IT Technical Handover Manual

[![Production Status](https://img.shields.io/badge/Deployment-Live-2ea44f?style=flat-square)](https://lesl-energy-website.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20Commercial-red?style=flat-square)]()

Official client delivery repository for **Lawrence Energy Services Limited (LESL)**. This repository contains the complete, production-ready source code, brand assets, interactive engineering CAD schematics, and deployment configurations for the LESL corporate web platform.

---

## 1. System Overview & Technology Stack

The platform is engineered as a modern, high-performance Single Page Application (SPA) designed to present LESL's industrial energy engineering portfolio—including turnkey gas power plants, high-voltage substations, gas generator synchronization (Jenbacher, Cummins, Caterpillar), and mechanical piping across Nigeria.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18.3** | Modular component architecture with React Router 6.28 |
| **Build Tooling** | **Vite 6.0** | Ultra-fast HMR and optimized ES-module bundling |
| **Styling & Design System** | **Tailwind CSS 3.4** | Custom LESL industrial engineering palette and responsive tokens |
| **Vector Kinetic Graphics** | **SVG + CSS Animation** | Interactive 3-phase electrical pylon, rotating turbine, and fluid surge art |
| **Iconography** | **Lucide React** | Industrial and electrical engineering symbol system |
| **Smooth Motion** | **Lenis + GSAP** | High-performance kinetic scrolling and micro-interactions |
| **Performance Optimization** | **Code-Splitting** | Route-level lazy loading yielding a sub-50KB gzip critical bundle |

---

## 2. Directory Structure

```text
lawrence-energy-services/
├── index.html                  # HTML5 entry with SEO, JSON-LD schema, and pre-cached splash
├── package.json                # Project dependencies and operational scripts
├── vite.config.js              # Bundling configuration and vendor code-splitting chunks
├── tailwind.config.js          # LESL corporate color tokens (Red, Yellow, Ink, Charcoal)
├── postcss.config.js           # PostCSS autoprefixer pipeline
├── vercel.json                 # Vercel SPA routing and edge header configuration
├── netlify.toml                # Netlify SPA redirect rules
├── .htaccess                   # Apache / cPanel rewrite rules for HTML5 SPA pushState
├── .gitignore                  # Git tracking exclusion list
│
├── public/                     # Static root directory (copied directly to dist on build)
│   ├── .htaccess               # Deployed Apache rewrite configuration
│   ├── _redirects              # Static SPA redirect fallback
│   └── assets/
│       ├── brand/              # High-resolution logos, badges, and favicons
│       ├── client-logos/       # Multi-national client and partner marks
│       ├── projects/           # High-resolution industrial plant photography
│       └── team/               # Board of directors and technical management headshots
│
└── src/                        # Complete application source
    ├── App.jsx                 # Central router with route-level Suspense code splitting
    ├── main.jsx                # DOM mount and application bootstrap
    ├── index.css               # Global typography, CSS custom properties, and reset
    │
    ├── components/             # Reusable UI modules
    │   ├── Header.jsx          # Sticky executive navigation with dark corporate identity
    │   ├── Footer.jsx          # Enterprise footer with sitemap, legal, and accreditation
    │   ├── HeroArt.jsx         # Dual-theme SVG technical drafting kinetic motion art
    │   ├── LeaderModal.jsx     # Executive leadership biography modal
    │   ├── Lightbox.jsx        # Project gallery high-resolution image previewer
    │   ├── Marquee.jsx         # Continuous industrial specialization ticker
    │   ├── MobileBottomBar.jsx # Sticky mobile quick-action bar (Call, WhatsApp, Quote)
    │   └── PageTransitionWipe  # Clean visual page wipe transition
    │
    ├── data/
    │   └── content.json        # Single Source of Truth: All company text, stats, and MW data
    │
    └── pages/                  # 14 Production Route Views
        ├── Home.jsx            # Homepage with architectural technical drafting hero
        ├── About.jsx           # Corporate history, safety record, board of directors
        ├── Services.jsx        # Comprehensive overview of electrical & mechanical services
        ├── ServiceDetail.jsx   # Dedicated deep-dive pages for each specialization
        ├── Projects.jsx        # Complete project track record (SBC, Mamuda, BUA, etc.)
        ├── Gallery.jsx         # Categorized engineering site photo library
        ├── Partners.jsx        # OEM relationships (GE Jenbacher, Cummins, Schneider)
        ├── Careers.jsx         # Open engineering positions and application details
        ├── Contact.jsx         # Direct contact details, interactive map, inquiry form
        ├── Quote.jsx           # Technical scope of work and quotation request form
        ├── Book.jsx            # Engineering consultation calendar slot booking
        ├── LegalPrivacy.jsx    # Corporate privacy policy
        ├── LegalTerms.jsx      # Commercial terms of service
        └── NotFound.jsx        # Custom 404 error page with quick recovery links
```

---

## 3. Deployment Guide: cPanel & Apache Shared Hosting

If LESL's domain (`lesl.ng` or corporate hosting) is hosted on a standard **cPanel / Apache / LiteSpeed** hosting server, follow these exact steps to deploy the website.

### Step 1: Generate the Production Build
On your local machine or build server, run:
```bash
npm install
npm run build
```
This produces a fully compiled, optimized `dist/` directory containing all HTML, CSS, JavaScript, assets, and `.htaccess`.

### Step 2: Upload Files via cPanel File Manager
1. Log in to your **cPanel Dashboard**.
2. Open **File Manager** and navigate to your web root:
   - For primary domain (`www.lesl.ng`): navigate to `/public_html/`.
   - For a subdomain (`new.lesl.ng` or `preview.lesl.ng`): navigate to the document root folder assigned to that subdomain.
3. If replacing an older site, back up the existing files into an archive folder.
4. Compress the contents of your local `dist/` folder into a `.zip` file (e.g. `website-build.zip`).
   > **Note:** Compress the *contents* inside `dist/`, so that `index.html` is at the root of the zip.
5. In cPanel File Manager, click **Upload**, upload `website-build.zip`, and click **Extract**.

### Step 3: Verify the `.htaccess` File (Crucial for Page Routing)
Because this is a Single Page Application, navigating directly to subpages (like `lesl.ng/about` or `lesl.ng/projects`) requires Apache's `mod_rewrite` to route requests to `index.html`. 

The pre-configured `.htaccess` file is automatically built into `dist/`. In cPanel File Manager:
1. Click **Settings** (top right corner of File Manager).
2. Check **Show Hidden Files (dotfiles)** and click **Save**.
3. Confirm that `.htaccess` exists in your web root. Its contents should read:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
```

### Step 4: Verify SSL / HTTPS
Ensure an active SSL certificate (such as cPanel's free **AutoSSL** or **Let's Encrypt**) is installed on the domain. To force all traffic to HTTPS, uncomment the HTTPS rewrite block in `.htaccess`.

---

## 4. Alternative Hosting: Cloud & VPS Platforms

### A. Vercel Deployment (Recommended Cloud Host)
The codebase includes native `vercel.json` configuration.
1. Connect the GitHub repository to your Vercel team account.
2. Vercel auto-detects **Vite** as the framework preset.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Deployment will proceed automatically on every push to the `master` branch.

### B. Netlify Deployment
The codebase includes native `netlify.toml` and `public/_redirects`.
1. Link repository in the Netlify Dashboard.
2. Build command: `npm run build`
3. Publish directory: `dist`

### C. Nginx (Linux VPS / Ubuntu Server)
If hosting on an Nginx web server, use this server block configuration for routing:
```nginx
server {
    listen 80;
    server_name lesl.ng www.lesl.ng;
    root /var/www/lesl/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 5. Local Development Instructions

### Prerequisites
- **Node.js**: Version 18.x or 20.x LTS installed.
- **npm**: Version 9.x or higher.

### Installation
Clone this repository to your local computer and install dependencies:
```bash
git clone https://github.com/Lifeuntold1/lawrence-energy-services.git
cd lawrence-energy-services
npm install
```

### Development Server
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser to `http://localhost:3000/`.

### Production Build & Preview
To test the production build locally before uploading to your server:
```bash
npm run build
npm run preview
```

---

## 6. Content Management & Updates

All corporate text, statistics, project lists, and service offerings are stored centrally in a structured data file:
- **Location:** `src/data/content.json`

### Editing Company Statistics (MW, Safety Hours, Years)
Open `src/data/content.json` and update the relevant values:
```json
{
  "stats": [
    { "label": "Installed Capacity", "value": "About 400 MW" },
    { "label": "Safe Man-Hours", "value": "100,000+" },
    { "label": "Track Record", "value": "Since 2009" }
  ]
}
```

### Adding or Updating Projects
Projects displayed on the homepage and `/projects` page are configured in the `projects` array in `src/data/content.json`. Simply add or modify entries with:
- `title`: Project title (e.g., "Seven Up Bottling Company IPP")
- `client`: Client name (e.g., "SBC Ikeja")
- `category`: "Electrical", "Mechanical", or "Turnkey"
- `capacity`: Capacity rating (e.g., "34MW Gas Generators")
- `soundproof`: Attenuation level (e.g., "69 dB at 1m")
- `image`: Relative path to image in `/assets/projects/`

### Adding or Replacing Photos
Place new project or equipment photography in:
`public/assets/projects/`
Images referenced in `content.json` using `/assets/projects/filename.jpg` will resolve automatically across all pages.

---

## 7. Contact & Quotation Forms Integration

The website includes three dedicated commercial inquiry forms:
1. **Contact Page:** `src/pages/Contact.jsx`
2. **Request a Quote Page:** `src/pages/Quote.jsx`
3. **Book Engineering Consultation Page:** `src/pages/Book.jsx`

### Connecting Forms to Corporate Email
By default, the forms handle client-side validation, data collection, and present an executive confirmation dialog. To connect these forms to your corporate email endpoint (e.g., `info@lesl.ng`), IT can:

1. **Option A: Free / Zero-Backend Webhook (Formspree or Web3Forms)**
   Replace the form submission `handleSubmit` in `Contact.jsx`, `Quote.jsx`, and `Book.jsx` with an endpoint fetch:
   ```javascript
   await fetch("https://api.web3forms.com/submit", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       access_key: "YOUR_ACCESS_KEY_HERE",
       ...formData
     })
   });
   ```

2. **Option B: PHP Mailer Script on cPanel**
   Create a small PHP script `contact.php` in `public/` that receives JSON and dispatches via standard PHP `mail()` or PHPMailer via LESL's SMTP mail server.

3. **Option C: Direct WhatsApp Integration**
   The mobile bottom bar and contact cards are pre-wired to launch WhatsApp chats with LESL's commercial department.

---

## 8. Brand Identity Standards

The site strictly implements Lawrence Energy Services Limited's brand design language:

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **LESL Corporate Red** | `#D9251C` | Primary brand accent, primary CTA buttons, badges |
| **LESL Deep Red** | `#B01E17` | Hover and active interaction states |
| **LESL Brand Yellow** | `#FFF500` / `#FFD700` | Secondary highlight, icons, arrows, taglines |
| **Architectural Charcoal**| `#0C0C0C` / `#1A1A1A` | High-contrast typography, technical schematics |
| **Technical Whiteprint** | `#FAF9F5` | Drafting parchment background for hero and sections |
| **Border Line** | `#E7E7E7` | Precision CAD hairline dividers |

---

## 9. Technical Handover Contacts

For inquiries regarding the codebase architecture, handoff documentation, or technical deployment support:

- **Client:** Lawrence Energy Services Limited (LESL)
- **Sector:** Power Generation, Substations & Industrial Piping Engineering
- **Platform:** Corporate Web Rebuild & Handover Edition
- **Repository Visibility:** Public
