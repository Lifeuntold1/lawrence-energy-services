================================================================================
LAWRENCE ENERGY SERVICES LIMITED (LESL) - cPANEL UPLOAD & DEPLOYMENT GUIDE
Website: https://lesl.ng | Modern Heavy Industrial Power Engineering
================================================================================

This package contains the complete, production-ready, high-performance build of 
the LESL website, pre-configured with Apache / cPanel URL rewriting (.htaccess),
Gzip compression, Core Web Vitals caching, and mobile responsiveness.

--------------------------------------------------------------------------------
QUICK 5-MINUTE cPANEL DEPLOYMENT STEPS:
--------------------------------------------------------------------------------

STEP 1: LOG IN TO cPANEL
  - Open your hosting control panel URL (e.g., https://yourdomain.com:2083 or
    via your hosting provider dashboard).
  - Log in with your cPanel username and password.

STEP 2: OPEN FILE MANAGER
  - In the cPanel dashboard, locate the "Files" section.
  - Click on "File Manager".

STEP 3: SHOW HIDDEN FILES (CRITICAL FOR .htaccess)
  - In the top-right corner of File Manager, click "Settings".
  - Check the box that says: [✓] "Show Hidden Files (dotfiles)".
  - Click "Save".
  * Why this matters: The `.htaccess` file handles all sub-page routing 
    (/about, /services, /projects, etc.). Showing hidden files ensures you can 
    see and manage it.

STEP 4: NAVIGATE TO YOUR WEB ROOT FOLDER
  - In the left sidebar or file list, double-click to open "public_html".
  - (If deploying to an Addon Domain or Subdomain, open that specific domain's
    designated document root folder instead of public_html).
  - If you have an existing or old website, you can select the old files, 
    click "Compress" to back them up, and then delete the old files so the folder 
    is clean.

STEP 5: UPLOAD THE ZIP FILE
  - Click the "Upload" button on the top toolbar of File Manager.
  - Drag and drop this ZIP file (LESL-cPanel-Production-Deploy.zip) or click 
    "Select File" to upload it.
  - Wait until the progress bar reaches 100% and turns GREEN.
  - Click the link at the bottom: "Go Back to /public_html".

STEP 6: EXTRACT THE ZIP FILE
  - In File Manager, click once on "LESL-cPanel-Production-Deploy.zip" to highlight it.
  - Click the "Extract" button in the top toolbar (or right-click the file and 
    choose "Extract").
  - A pop-up will ask for the extraction path. Ensure it says:
      /public_html
  - Click "Extract File(s)".
  - A dialog showing extracted files will appear. Click "Close".

STEP 7: CONFIRM ROOT STRUCTURE
  - Verify that the following files and folders are directly inside your 
    public_html directory:
      ├── .htaccess               (Apache URL rewrite & speed config)
      ├── index.html              (Main website entrance)
      ├── assets/                 (All JS, CSS, images, team portraits, logos)
      ├── .well-known/            (Domain verification files)
      ├── robots.txt              (SEO crawler rules)
      ├── sitemap.xml             (Google search sitemap)
      ├── llms.txt & llms-full.txt
      └── README_CPANEL_INSTRUCTIONS.txt
  * IMPORTANT: Make sure the files are directly in public_html, NOT nested 
    inside a subfolder.

STEP 8: CLEAN UP (OPTIONAL)
  - You can now delete the uploaded "LESL-cPanel-Production-Deploy.zip" file 
    from public_html to save server disk space.

STEP 9: TEST THE LIVE WEBSITE
  - Open your browser and visit:
      https://lesl.ng/ (or your domain URL)
  - Test clicking between pages:
      - About Us (/about)
      - Services (/services)
      - Projects (/projects)
      - Gallery (/gallery)
      - Partners & Clients (/partners)
      - Contact Us (/contact)
      - Careers (/careers)
      - Book an Inspection (/book)
      - Request a Quote (/quote)
  - Refresh any sub-page (e.g., https://lesl.ng/about) directly in your browser. 
    The `.htaccess` file ensures that all direct page loads, refreshes, and deep 
    links load instantly without 404 errors.

--------------------------------------------------------------------------------
TECHNICAL SUMMARY & COMPATIBILITY
--------------------------------------------------------------------------------
- Platform: Apache / LiteSpeed / Nginx with Apache backend (standard cPanel)
- PHP Requirement: None (Static SPA - zero server-side PHP dependencies)
- Database: None required (Fast static delivery via client-side React 19)
- HTTPS / SSL: Fully supported out-of-the-box (Let's Encrypt, cPanel AutoSSL)
- Performance: Assets pre-hashed for immutable 1-year browser caching; 
  brotli/gzip compression headers included.

================================================================================
For technical inquiries or updates:
Lawrence Energy Services Limited (LESL) - Technical Support
================================================================================
