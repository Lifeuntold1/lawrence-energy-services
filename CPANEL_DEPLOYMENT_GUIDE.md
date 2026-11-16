# LESL Website — Complete cPanel Upload & Deployment Guide

> **Zero Terminal Commands Required.**  
> This build is 100% pre-compiled. You do not need Node.js, npm, Git, or SSH terminal access on the server. The entire upload is completed via the cPanel web interface in under 5 minutes.

---

## Package Overview

* **Deployment Archive**: `LESL-cPanel-Production-Deploy.zip` (~41 MB)
* **Architecture**: Production-compiled static single-page application (React 19 + Vite)
* **Server Compatibility**: Apache, LiteSpeed, Nginx reverse proxy (standard cPanel hosting)
* **Included Configuration**: Pre-configured `.htaccess` file for URL routing, Gzip compression, and browser caching

---

## 5-Minute Step-by-Step Instructions

### Step 1: Log in to cPanel
1. Open your web browser and go to your hosting control panel (e.g. `https://yourdomain.com:2083` or via your web host dashboard).
2. Enter your cPanel username and password.

---

### Step 2: Open File Manager and Enable Hidden Files
1. In the cPanel dashboard, locate the **Files** section and click **File Manager**.
2. In the top-right corner of File Manager, click the **Settings** button (gear icon).
3. Check the box that says: **"Show Hidden Files (dotfiles)"**.
4. Click **Save**.
   > *Why this step is important:* The `.htaccess` file begins with a dot. Enabling hidden files ensures the routing file is visible and properly extracted.

---

### Step 3: Navigate to Your Web Root Folder (`public_html`)
1. In the left folder tree of File Manager, click on **`public_html`**.
   *(Note: If you are deploying to an Addon Domain or Subdomain, navigate to that specific domain's assigned document root folder instead).*
2. If you have an existing older website in `public_html`:
   * Select all existing files and click **Compress** to make a quick backup zip.
   * Move the backup to a safe location or delete the old files so `public_html` is empty and ready.

---

### Step 4: Upload the Zip Archive
1. Click the **Upload** button on the top File Manager toolbar. A new upload tab will open.
2. Click **Select File** (or drag and drop) and choose:
   ```text
   LESL-cPanel-Production-Deploy.zip
   ```
3. Wait for the upload progress bar to reach **100% and turn GREEN**.
4. Click the link at the bottom that says **"Go Back to /public_html"**.

---

### Step 5: Extract the Files
1. In File Manager, click once on **`LESL-cPanel-Production-Deploy.zip`** to highlight it.
2. Click the **Extract** button on the top toolbar (or right-click the file and select **Extract**).
3. A pop-up modal will ask where to extract the files. Confirm the path is:
   ```text
   /public_html
   ```
4. Click **Extract File(s)**.
5. Once the extraction completes, click **Close**.

---

### Step 6: Verify the Root Structure
Check that the following files and folders appear directly inside your **`public_html`** folder:

```text
public_html/
├── .htaccess                     # Apache SPA URL routing & caching
├── index.html                    # Main site entry point
├── assets/                       # Images, logos, scripts & stylesheets
├── .well-known/                  # Domain identity configuration
├── robots.txt                    # Search engine instructions
├── sitemap.xml                   # Google XML sitemap
├── llms.txt & llms-full.txt      # AI context files
└── README_CPANEL_INSTRUCTIONS.txt
```

> **IMPORTANT CHECK:** Make sure the files are directly inside `public_html`, **NOT** inside an extra subfolder like `public_html/dist/`. The archive is already packaged with all files at the root level.

---

### Step 7: Clean Up (Optional)
Right-click **`LESL-cPanel-Production-Deploy.zip`** in File Manager and click **Delete** (check "Skip the trash and permanently delete the files") to free up disk space.

---

### Step 8: Visit and Test the Live Website
Open your browser and visit your website:
* **Home**: `https://lesl.ng/`
* **About Us**: `https://lesl.ng/about`
* **Services**: `https://lesl.ng/services`
* **Projects**: `https://lesl.ng/projects`
* **Gallery**: `https://lesl.ng/gallery`
* **Partners**: `https://lesl.ng/partners`
* **Contact**: `https://lesl.ng/contact`
* **Careers**: `https://lesl.ng/careers`
* **Book an Inspection**: `https://lesl.ng/book`
* **Request a Quote**: `https://lesl.ng/quote`

> **Verification Test:** Click through the navigation links, then press **Refresh (F5)** on any subpage (e.g. `/about`). It should reload cleanly without any 404 error because the `.htaccess` file automatically routes requests to `index.html`.

---

## Troubleshooting & Quick Fixes

| Question / Symptom | Solution |
| :--- | :--- |
| **Old website still appears after upload** | Clear your browser cache using `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac), or open an Incognito / Private window. If you use Cloudflare, click "Purge Everything" in the Cloudflare caching dashboard. |
| **Page refresh on `/about` or `/services` gives 404 Not Found** | Check that `.htaccess` was extracted to `public_html`. Ensure "Show Hidden Files" is turned on in File Manager Settings so you can see it. |
| **The website shows an empty white page or directory listing** | Make sure `index.html` is located directly in `public_html` and not inside a subfolder. |
| **HTTPS / SSL Certificate** | In cPanel under the **Security** section, check **SSL/TLS Status** and run "AutoSSL" to generate a free Let's Encrypt / Sectigo SSL certificate if HTTPS is not yet active. |
