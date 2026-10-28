# Research Consultant Website

A one-page, static website for a freelance research consultant. No build step — just HTML, CSS and a little JavaScript.

## Sections

- **Hero** – headline, intro and key stats
- **Services** – four service cards
- **Experience** – background, sectors and career timeline
- **Testimonials** – client quotes
- **Contact** – enquiry form with validation

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Customise

All copy is placeholder text. Before publishing, replace:

- The name **Alex Morgan** and the stats, services, experience and testimonials in `index.html` (use real quotes from real clients only, with their permission)
- `hello@example.com` in `index.html` and `script.js`
- Brand colours and fonts at the top of `styles.css` (`:root` variables)

### Contact form

The form posts to [Formspree](https://formspree.io). Create a free form there and replace `YOUR_FORM_ID` in the form's `action` attribute in `index.html`. Until you do, submitting the form opens the visitor's email app with the message pre-filled.

## Deploy

Works on any static host — e.g. GitHub Pages (Settings → Pages → deploy from the `main` branch), Netlify or Vercel.
