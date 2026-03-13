# Ink Alley Vendor Dashboard — Deployment Guide

## What's in this package

```
ink-alley-deploy/
├── index.html                      ← The dashboard (all pages, all logic)
├── netlify.toml                    ← Netlify config (routing + functions)
├── netlify/
│   └── functions/
│       └── sage-proxy.js          ← SAGE API proxy (runs server-side)
└── DEPLOY.md                      ← This file
```

---

## Step 1 — Create a free Netlify account

1. Go to **https://netlify.com**
2. Click **Sign up** — use your email or sign in with Google
3. You'll land on the Netlify dashboard

---

## Step 2 — Deploy the site (drag & drop — no coding)

1. On the Netlify dashboard, look for the box that says **"Drag and drop your site folder here"**  
   *(it's on the Sites page, toward the bottom)*
2. Open **File Explorer / Finder** on your computer
3. Find the **ink-alley-deploy** folder
4. **Drag the entire folder** onto that Netlify box
5. Netlify will upload and deploy in about 30 seconds
6. You'll get a URL like: `https://random-name-12345.netlify.app`

> ✅ That's it. The dashboard is live and the SAGE proxy is active.

---

## Step 3 — Test it

1. Open the URL Netlify gave you
2. Log in with any role (Admin, Sales, etc.)
3. Click the **Promo Search** tab
4. Search for something like **"tumblers"** and hit Enter
5. Products should load from the SAGE database within 1–2 seconds

---

## Step 4 — Set a custom domain (optional)

If you want it on a custom URL like `dashboard.inkalleyshirts.com`:

1. In Netlify, go to **Site Settings → Domain Management**
2. Click **Add custom domain**
3. Enter your domain (e.g. `dashboard.inkalleyshirts.com`)
4. Netlify will give you DNS records to add — log into wherever your domain is registered (GoDaddy, Namecheap, etc.) and add them
5. Netlify handles the SSL certificate automatically

---

## Updating the dashboard later

Whenever you want to update the dashboard (new features, design changes, etc.):

1. Replace `index.html` in the folder with the new version
2. Drag the folder onto Netlify again — it will redeploy automatically

Or, for automatic deploys from GitHub (more advanced), ask your developer to connect the repo to Netlify.

---

## How the SAGE proxy works

The **Promo Search** tab searches SAGE's database of 1M+ promotional products.

SAGE's API cannot be called directly from a browser (security restriction). The `sage-proxy.js` function runs on Netlify's servers and:
1. Receives the search request from your browser
2. Adds your SAGE credentials
3. Forwards the request to SAGE
4. Returns the results to your browser

This is all automatic — you don't need to do anything to set it up.

**SAGE credentials stored in the proxy:**
- Account: 256432
- Login: JacobWilliams
- Key: (stored securely in sage-proxy.js)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Promo Search shows "Error" | Check that sage-proxy.js is in the netlify/functions folder |
| Site won't load | Make sure you dragged the whole folder, not just index.html |
| Custom domain not working | DNS changes can take up to 24 hours to propagate |
| Need to add a team member login | Edit the `ROLES` section at the top of index.html |

---

## Questions?

Contact SAGE support: **800.925.7243** or **support@sageworld.com**  
SanMar integrations: **sanmarintegrations@sanmar.com** or **206-727-6458**
