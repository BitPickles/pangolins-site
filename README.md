# Pangolins

Apple-style bilingual static site for the Pangolins Morpho Curator strategy.

## Local Development

```bash
npm install
npm run dev
```

## Static Build

```bash
npm run build
```

The production build uses Next.js static export and writes the deployable site to `out/`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the site on pushes to `main` and deploys `out/` to GitHub Pages.
