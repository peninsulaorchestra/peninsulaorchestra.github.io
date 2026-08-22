# Images

- `hero.jpg` — the full-bleed photo behind the homepage banner.
- `conductor.jpg` — shown in the "Our Conductor" section of the About page.
- `logo.png` — the orchestra's treble-clef mark, from the old site. Not
  currently used anywhere.
- `gallery/thumbs/` and `gallery/full/` — the photo gallery.

## Adding a gallery photo

Each photo needs two files with the **same name**:

- `gallery/thumbs/NAME.jpg` at roughly 700px wide — this is what loads with the
  page, so keep it under about 100KB
- `gallery/full/NAME.jpg` at roughly 1600px wide — fetched only when someone
  opens the photo

Then add an entry to `_data/gallery.yml`:

```yaml
- file: NAME.jpg
  caption: A short description of what is happening
```

The caption is used both as the hover label and as the image's alt text, so
write it for someone who cannot see the photo.

On a Mac you can resize without extra software:

```sh
sips -Z 700  -s format jpeg -s formatOptions 55 original.jpg --out gallery/thumbs/NAME.jpg
sips -Z 1600 -s format jpeg -s formatOptions 68 original.jpg --out gallery/full/NAME.jpg
```
