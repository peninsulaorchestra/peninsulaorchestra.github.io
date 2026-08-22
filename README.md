# peninsulaorchestra.ca

The Peninsula Orchestra website. Built with **Jekyll**, which GitHub Pages
compiles automatically on every push — there is no build step to run and
nothing to install.

## Editing the site

Most changes don't require touching HTML. Open the file on github.com, click
the pencil icon, edit, and commit — the live site updates in about a minute.

| To change… | Edit this file |
| --- | --- |
| Concert listings | `_data/events.yml` |
| News announcements | `_data/news.yml` |
| Links on the Events page | `_data/links.yml` |
| The executive roster | `_data/executive.yml` |
| Photo gallery tiles | `_data/gallery.yml` |
| The About page text | `about.md` |
| Menu, contact email, footer year | `_config.yml` |
| Colours, fonts, spacing | `css/style.css` |

### Adding a concert

Open `_data/events.yml` and add an entry:

```yaml
- date: 2026-09-14
  title: Season Opening Concert
  description: Beethoven's Fifth, with guest soloist.
```

The month, day and year on the left of the listing fill in automatically. If
the date isn't settled yet, leave `date:` off and use `year: 2026` instead —
it shows as "Date TBA".

### Adding a photo

Put the image in `images/`, then point a gallery entry at it:

```yaml
- caption: Concert performance
  image: /images/concert.jpg
```

## How it fits together

- `_layouts/default.html` — the header, nav and footer wrapped around every
  page. Change the menu here once instead of in five files.
- `_layouts/page.html` — adds the centred prose column used by the About page.
- `_includes/facts.html` — the grey label/value list used in a few places.
- `_data/*.yml` — the content that repeats: concerts, news, people, photos.
- `*.html` / `*.md` — one file per page, holding just that page's content.

## Working locally (optional)

You don't need this to make content edits, but if you want to preview before
publishing you'll need Ruby 3.0 or newer:

```sh
gem install jekyll bundler
jekyll serve      # then open http://localhost:4000
```

Note that macOS ships with Ruby 2.6, which is too old — install a current Ruby
via Homebrew (`brew install ruby`) or rbenv first.
