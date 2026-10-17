# Edward Mugo — Portfolio

A static, accessible portfolio documenting practical work in cybersecurity engineering, digital forensics, infrastructure security, and security research.

**Live site:** https://huginnshammer.github.io/portfolio/ (available after GitHub Pages deployment is enabled and the workflow completes).

## Design principles

- Evidence before claims: project status, methods, limitations, and results should be verifiable.
- Static-first: semantic HTML, custom CSS, and small progressive-enhancement JavaScript; no framework runtime, analytics, external fonts, or third-party scripts.
- Accessible and responsive: keyboard-visible focus, reduced-motion support, readable contrast, semantic landmarks, and mobile layouts.
- Honest project reporting: unfinished work is labelled as in progress; no invented metrics, results, awards, or credentials.

## Site structure

- `index.html` — homepage
- `projects/` — project overview and CloudSentry case study
- `digital-forensics/` — forensic methodology and case-note framework
- `research/` — research and lab notes
- `writing/` — technical writing index
- `about.html` — background and interests
- `contact.html` — direct contact links
- `assets/css/site.css` — design system and responsive styles
- `assets/js/site.js` — small enhancements (navigation and current year)
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. The workflow deploys the repository root as a static site when changes are pushed to `main`.
4. Open **Actions** and wait for **Deploy portfolio to GitHub Pages** to complete successfully.
5. Visit https://huginnshammer.github.io/portfolio/.

The workflow uses GitHub's official Pages actions. No secrets or build dependencies are required.

## Editing content in GitHub's web interface

Open a file, choose the pencil icon, edit the text, and commit to `main`. For new pages, use **Add file → Create new file** and preserve the relative asset paths used by that page. Keep claims tied to evidence and update project status when the repository changes.

## Before making the site fully public

- Confirm the official degree title and university wording.
- Review every project description and mark implementation status accurately.
- Add a CV only after the document is ready to publish.
- Add forensic case studies only when evidence is authorized to share and sensitive identifiers have been removed.
- Add articles only when a real draft or publication exists.
- Test the deployed site on a phone, with keyboard navigation, and with a screen reader where possible.

## License

The source code and original design are provided under the MIT License. Project-specific artifacts and third-party trademarks remain subject to their respective licenses.
