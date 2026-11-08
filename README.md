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
| Concerts and events, upcoming and past | One file each in `_events/` |
| Guest artist biographies | `_data/artists.yml` |
| News announcements | `_data/news.yml` |
| Links on the Events page | `_data/links.yml` |
| The executive roster | `_data/executive.yml` |
| Photo gallery tiles | `_data/gallery.yml` |
| The About page text | `about.md` |
| Menu, contact email, Facebook link | `_config.yml` |
| The "message us" button | `_config.yml` (`messenger:`) |
| The cookie notice wording | `_includes/cookie-notice.html` |
| Where contact form messages are sent | `_config.yml` (`web3forms_key`) |
| Colours, fonts, spacing | `css/style.css` |

### Adding a concert

Every concert is its own file in the `_events/` folder, and gets its own page
on the site — `_events/2026-12-14-holiday-concert.md` becomes
`peninsulaorchestra.ca/events/2026-12-14-holiday-concert/`. Search engines and
AI assistants pick up each concert from its page, so the more fields you fill
in, the better they can describe it.

On github.com, open the `_events` folder, choose **Add file → Create new
file**, name it `date-short-title.md` (lower case, hyphens, no spaces), and
fill it in:

```yaml
---
title: Holiday Concert
date: 2026-12-14 19:30
time: 7:30 pm, doors at 7:00
venue: Trillium United Church
address: 415 Linwell Rd., St. Catharines
soloist: Jane Smith, violin
description: A celebration of the season.
programme:
  - Beethoven — Symphony No. 1
  - Anderson — Sleigh Ride
---
```

The easiest start is to copy an existing file from the folder and change it.

- **`date:`** — `YYYY-MM-DD`, with the start time on the 24-hour clock after
  it if you know it (`2026-12-14 19:30`). The time is what search engines
  show; `time:` is the wording shown on the page.
- **`soloist:`** — `Name, instrument`.
- **`programme:`** — one line per work, `Composer — Work`, with the long dash.
  This is how search engines learn what's being played.
- Also available: `date_end` for multi-day events, `tickets`, `link_url` and
  `link_text` for a button-style link, and `poster` plus `poster_alt` for an
  image in `images/posters/`.
- **Date not settled?** Leave `date:` off and put `year: 2027` instead; it
  shows as "Date TBA" at the end of the upcoming list.
- **Only know the season?** Use `date_text: Spring 2027` for what's shown,
  plus a rough `date:` so it sorts in the right place.
- Anything written **below** the closing `---` appears on the concert's own
  page as a longer write-up.

Concerts move from "Upcoming" to "Past Concerts" by themselves once they're
over — there's nothing to move. The site only rebuilds when something is
changed, so the move shows up at the next update.

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
- `_layouts/event.html` — a concert's own page, used by every file in `_events/`.
- `_includes/schema*.html` — the structured data search engines and AI
  assistants read, generated from the concert files and `_config.yml`.
- `_events/*.md` — one file per concert.
- `_data/*.yml` — the other content that repeats: news, people, photos.
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
