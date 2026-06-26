# Peninsula Orchestra — website

A static website for the Peninsula Orchestra (Niagara, Ontario), built as plain
HTML/CSS/JS with no build step, ready to host on **GitHub Pages**.

## Files

```
index.html      Home
about.html      About Us
gallery.html    Photo Gallery
events.html     Events, News & Links
contact.html    Contact Us + Executive
css/style.css   All styling
js/main.js      Mobile nav + contact form (mailto)
images/         Add photos here
CNAME           Custom domain (peninsula-orchestra.com)
.nojekyll       Tells GitHub Pages to serve files as-is
```

## Preview locally

```bash
cd /Users/matthew/code/orch
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**.
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → Save.
3. The site goes live at the subpath URL:

   ```
   https://<you>.github.io/<repo>/
   ```

   All links here are relative, so the site works as-is under that subpath —
   no further configuration needed.

### Later: switch to the custom domain

When you're ready to move to `peninsula-orchestra.com`:
   - Add a file named `CNAME` at the repo root containing the single line
     `peninsula-orchestra.com`.
   - At your DNS provider, point the domain at GitHub Pages
     (`A` records to GitHub's IPs, or a `CNAME` for `www`). See
     [GitHub's custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
   - Enable **Enforce HTTPS** once the certificate is issued.

## Notes

- The contact form has no backend (GitHub Pages is static), so it opens the
  visitor's email app pre-addressed to `info@peninsula-orchestra.com`. For a
  real submission form, use a service like Formspree or Netlify Forms.
- Content (events, conductor, executive) is editable directly in the HTML.
