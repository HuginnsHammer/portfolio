# Edward Mugo — Portfolio

A static, accessible portfolio documenting practical work in cybersecurity engineering, digital forensics, infrastructure security, and security research.

**Site URL:** https://huginnshammer.github.io/portfolio/ (after GitHub Pages is enabled and deployment succeeds).

## Design principles

- Evidence before claims: project status, methods, limitations, and results should be verifiable.
- Static-first: semantic HTML, custom CSS, and minimal JavaScript; no framework runtime, analytics, external fonts, or third-party scripts.
- Accessibility: keyboard-visible focus, reduced-motion support, semantic landmarks, and responsive layouts.
- Honest reporting: unfinished work is labelled as in progress; no invented metrics, publications, awards, or credentials.

## Site map

- `index.html` — homepage
- `projects/` — project index and CloudSentry case study
- `digital-forensics/` — forensic methodology
- `research/` — research interests and lab-note direction
- `writing/` — technical writing index
- `about.html` — background and interests
- `contact.html` — direct contact links
- `assets/css/site.css` — responsive design system
- `assets/js/site.js` — minimal enhancements
- `.github/workflows/pages.yml` — deployment workflow

## Enable GitHub Pages

The first workflow run cannot enable Pages automatically because the workflow token does not have permission to create the Pages site. Enable it once in the repository settings:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions** and rerun **Deploy portfolio to GitHub Pages**, or push a new commit.
4. Wait for the build and deployment jobs to succeed.
5. Visit https://huginnshammer.github.io/portfolio/.

The workflow checks that required assets exist and parses the HTML pages before uploading the static site. No package installation or deployment secret is required.

## Editing through GitHub's web interface

Open a file, choose the pencil icon, edit, and commit to `main`. For new pages, use **Add file → Create new file** and keep the relative asset paths consistent with the page's folder depth. Check the Actions run after each change.

## Before treating the portfolio as final

- Confirm the official degree title and university wording.
- Review project descriptions against current source code and CI.
- Add a CV only when the document is ready to publish.
- Publish forensic write-ups only for authorized, sanitized evidence.
- Add articles only when a real draft or publication exists.
- Test the deployed site on mobile and with keyboard navigation; consider a screen-reader pass.

## License

Original source and design are provided under the MIT License. Project-specific artifacts and third-party trademarks remain subject to their respective licenses.
