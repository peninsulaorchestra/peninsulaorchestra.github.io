# Images

`hero.jpg` is the full-bleed photo behind the homepage banner. Replacing that
file changes the homepage image.

To add a gallery photo:

1. Drop the image file in this folder, e.g. `concert.jpg`.
2. Open `_data/gallery.yml` and add its path to the matching entry:

```yaml
- caption: Concert performance
  image: /images/concert.jpg
```

An entry with no `image:` shows as a grey placeholder tile with the caption on it.
