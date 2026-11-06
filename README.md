# qinyangyu.github.io

Personal website of Qinyang Yu: <https://qinyangyu.github.io/>

A small Jekyll site served by GitHub Pages. No theme is used: the layout and styles all live in this repository.

## Where things are

| What | File |
| --- | --- |
| Name, position, email, links, photo | `_config.yml` |
| Homepage sections (bio, news, education, ...) | `index.md` |
| Other pages | `research.md`, `teaching.md`, `talks.md`, `articles.md`, `personal.md` |
| Top navigation | `_data/navigation.yml` |
| Page structure | `_layouts/`, `_includes/` |
| Colours, fonts, spacing | `assets/css/main.css` (variables at the top) |
| Photo sliders | `assets/js/slider.js` |
| CV (edit here; GitHub rebuilds `files/cv/CV_Qinyang_Yu.pdf` automatically) | `_cv/main.tex` |
| PDFs, photos, videos | `files/` |
| Saved alternative designs (not published) | `_archive/` (see its README) |

## Preview locally

Install [Ruby](https://www.ruby-lang.org/) first, then:

```bash
bundle install
bundle exec jekyll serve
```

and open <http://localhost:4000>.
