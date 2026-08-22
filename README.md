# peninsulaorchestra.ca

The Peninsula Orchestra website. Built with **Jekyll**, which GitHub Pages
compiles automatically on every push — there is no build step to run and
nothing to install.

## Editing the site

Most changes don't require touching HTML, git, or anything installed. Every
change goes through a pull request, so a mistake is caught before it reaches
the live site.

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
| Turning the chat widget on or off | `_config.yml` (`tawk:`) |
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

## Making a change

1. Open the file on github.com and click the **pencil icon**.
2. Make your edit.
3. Click **Commit changes**. In the box that appears choose
   **"Create a new branch for this commit and start a pull request"**, then
   **Propose changes** and **Create pull request**.
4. Wait about a minute. A check runs against your change and reports back on
   the pull request:
   - **Green tick** — click **Merge pull request**. The site updates about a
     minute later.
   - **Red X** — click **Details** to see which file and line is wrong. Fix it
     with the pencil icon on the same pull request and the check runs again.

The branch is deleted automatically once the pull request is merged, so there
is nothing to tidy up afterwards.

Nothing you do in a pull request affects the live site until it is merged, so
there is no way to break the site for visitors. If you get in a mess, close the
pull request and start again.

## When the check fails

The content files are YAML, which is fussy about punctuation and indentation.
The three things that go wrong:

| Message | Cause |
| --- | --- |
| `mapping values are not allowed here` | Missing space after a colon — write `title: Concert`, not `title:Concert` |
| `could not find expected ':'` | Indentation is inconsistent; every field in an entry needs the same indent |
| Something about a special character | A value containing `:` or `#` needs quotes: `title: "Star Wars: A New Hope"` |

The check names the file and the line number, so start there.

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
