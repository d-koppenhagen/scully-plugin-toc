# scully-plugin-toc - The Table Of Contents `postRenderer`

![Build Status](https://github.com/d-koppenhagen/scully-plugin-toc/workflows/Node.js%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/scully-plugin-toc.svg)](https://www.npmjs.com/package/scully-plugin-toc)
[![Dependency Status](https://david-dm.org/d-koppenhagen/scully-plugin-toc.svg)](https://david-dm.org/d-koppenhagen/scully-plugin-toc)
[![devDependency Status](https://david-dm.org/d-koppenhagen/scully-plugin-toc/dev-status.svg)](https://david-dm.org/d-koppenhagen/scully-plugin-toc?type=dev)

[![npm](https://img.shields.io/npm/l/scully-plugin-toc.svg)](https://www.npmjs.com/package/scully-plugin-toc)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This plugin for [Scully](https://github.com/scullyio/scully) provides a `postRenderer` to generate a _table of contents_ (_TOC_) for the rendered route content.

## Usage

To use the plugin you should import it in your scully configuration file (`scully.<project-name>.config.js`) and define it as a `postRenderer` for a route definition.
You can configure the plugin by using the `toc` options:

```js
require('./scully-plugins/toc');

exports.config = {
  projectRoot: "./src",
  projectName: "your-project-name",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: ['toc'],
      slug: {
        folder: "./blog"
      },
      toc: {
        blogAreaSelector: '.blog-content',
        insertSelector: '#toc',
        level: ['h2', 'h3'],
      }
    },
  }
};
```

The TOC is generated by analyzing the headings (`<h1>`, `<h2>`, etc.) generated by _Scully_.
The above example configuration will look for a HTML element with the id `toc` and insert the TOC at this place generated for headings `<h2>` and `<h3>`.

```md
# my blog post

<div id="toc">
  <h2>Table of contents</h2>
</div>

## heading 1
### subheading 1
## heading 2
### subheading 2
```

## Options

You can configure the `scully-plugin-toc` by adding the `toc` options to your route configuration.
The following table will explain the options in detail.

- `blogAreaSelector`: This defines the area in which the `scully-plugin-toc` will search for headings.
If you use for example `<div class="blog"><scully-content></scully-content></div>` you should define `blogAreaSelector: ".blog"` to generate the TOC only from the blog content and not from the whole webpage.
If the parameter is not set, the plugin will search for heading at the whole page.
- `insertSelector`: The selector defines the point where the `scully-plugin-toc` will inset the generated TOC.
By default the plugin will use `#toc` as selector.
It will skip the TOC generation when there is no selector match.
In fact to insert the TOC in a blog post, you should at least add a `<div id="toc"></div>` in your blog post and this is the place where the TOC will be inserted.
- `level`: This option defines the heading levels to include in the TOC. By default the value `level: ['h2', 'h3']` is used.
Only valid HTML headings are supported (`h1`, `h2`, `h3`, `h4`, `h5` and `h6`).
