# Pest Report Pro

> A lightweight, offline-ready PDF report generator for small pest control businesses.

## What is it?

Pest Report Pro is a **pure front-end web app** that lets pest control technicians generate professional service reports, quotes, and chemical logs — right from their phone or laptop. No signup, no server, no monthly fees.

## Features

- **Service Report** (Free): Generate professional PDF service reports with pest findings, treatment details, and chemical usage.
- **Quote Generator** (Pro): Create itemized quotes with your company branding.
- **Chemical Log** (Pro): Track and export chemical usage for compliance.
- **Company Branding**: Upload your logo, license number, and technician signature.
- **Offline Ready**: Install as a PWA and use without internet.
- **Mobile First**: Designed for technicians in the field.

## Pricing

- **Free**: Service reports with a small watermark.
- **Pro ($19 one-time)**: Remove watermark, unlock quotes and chemical logs.

## Tech Stack

- HTML5 + Tailwind CSS
- jsPDF + jspdf-autotable
- localStorage
- PWA (manifest + service worker)

## How to Use

1. Open `index.html` in any modern browser.
2. Go to **Settings** and fill in your company info.
3. Create a **Service Report**, fill in the details, and hit **Generate PDF**.
4. (Optional) Unlock Pro for $19 on Gumroad.

## Deployment

### GitHub Pages (Free)

1. Push this repo to GitHub.
2. Go to Settings > Pages > Deploy from branch.
3. Select `main` branch and `/ (root)` folder.
4. Your app is live at `https://yourusername.github.io/pest-report-pro/`.

### Gumroad Integration

1. Create a product on Gumroad.
2. Enable "Generate unique license key per sale".
3. Set product permalink to `pest-report-pro`.
4. Update `js/app.js` with your Gumroad product permalink.

## Development

No build step required. Just open `index.html` locally or serve with any static server:

```bash
npx serve .
```

## License

Proprietary. Free to use for personal evaluation. Pro features require purchase.
