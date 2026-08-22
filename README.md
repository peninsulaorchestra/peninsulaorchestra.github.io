# peninsulaorchestra.ca

The Peninsula Orchestra website. Built with **Jekyll**, which GitHub Pages
compiles automatically on every push — there is no build step to run and
nothing to install.

## Editing the site

Most changes don't require touching HTML. Open the file on github.com, click
the pencil icon, edit, and commit — the live site updates in about a minute.

| To change… | Edit this file |
| --- | --- |
| Upcoming concerts | `_data/events.yml` |
| Past concerts | `_data/past_events.yml` |
| Guest artist biographies | `_data/artists.yml` |
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

Optional fields: `time`, `venue`, `address`, `soloist`, `tickets`, `description`,
`programme` (a list of works), and `date_end` for multi-day events.

When a concert has happened, move its entry from `_data/events.yml` to
`_data/past_events.yml`. If the "Upcoming Concerts" list is empty the page shows
a short "nothing announced yet" message instead of an empty gap.

### Adding a photo

Put the image in `images/`, then point a gallery entry at it:

```yaml
- caption: Concert performance
  image: /images/concert.jpg
```

## If you make a mistake

The content files are YAML, which is picky about punctuation and indentation.
If something is off, **the live site does not break** — it keeps serving the
last good version.

Every change is automatically checked. Within about a minute of committing,
GitHub shows either a green tick or a red X next to your commit:

- **Green tick** — your change is live.
- **Red X** — something is wrong and the site has *not* updated. Click the X,
  then "Details", and the message names the file and line number.

The usual culprits:

| Symptom | Fix |
| --- | --- |
| `mapping values are not allowed here` | A missing space after a colon — write `title: Concert`, not `title:Concert` |
| `could not find expected ':'` | Indentation is inconsistent; every field under an entry needs the same number of spaces |
| A value containing `:` or `#` | Wrap it in quotes: `title: "Star Wars: A New Hope"` |

If you get stuck, the safest fix is to revert: open the commit, click the "..."
menu and choose Revert. That puts things back and you can try again.

## How it fits together

- `_layouts/default.html` — the header, nav and footer wrapped around every
  page. Change the menu here once instead of in five files.
- `_layouts/page.html` — adds the centred prose column used by the About page.
- `_includes/facts.html` — the grey label/value list used in a few places.
- `_data/*.yml` — the content that repeats: concerts, news, people, photos.
- `*.html` / `*.md` — one file per page, holding just that page's content.

## Working locally (optional)

You don't need this to make content edits — the table above covers those
through github.com. But if you want to preview before publishing:

```sh
brew install ruby@3.3
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
bundle install
bundle exec jekyll serve      # http://localhost:4000, reloads as you edit
```

Ruby **3.3** specifically: the `Gemfile` pins the `github-pages` gem, which is
what GitHub runs server-side, and one of its dependencies caps Ruby below 4.0.
Pinning it this way means what you see locally is what gets published.

macOS ships Ruby 2.6, which is too old — hence the Homebrew install.
