import { RouteData } from '@scullyio/scully/routerPlugins/addOptionalRoutesPlugin';

import { headingLevel, tocPlugin } from '../src/toc';

describe('headingLevel', () => {
  test('should return the heading level number', () => {
    expect(headingLevel('h0')).toBeNull();
    expect(headingLevel('h1')).toBe(1);
    expect(headingLevel('h2')).toBe(2);
    expect(headingLevel('h3')).toBe(3);
    expect(headingLevel('h4')).toBe(4);
    expect(headingLevel('h5')).toBe(5);
    expect(headingLevel('h6')).toBe(6);
    expect(headingLevel('h7')).toBeNull();
    expect(headingLevel('foo')).toBeNull();
    expect(headingLevel('h1h2')).toBe(1);
  });
});

describe('tocPlugin', () => {
  let defaultValidHtml: string;
  let defaultRouteDataConfig: RouteData;

  beforeEach(() => {
    defaultValidHtml = `<!DOCTYPE html>
  <html lang="de">
    <head>
      <base href="/">
      <meta charset="utf-8">
    </head>
    <body>
      <h1>Before Blog Main Content</h1>
      <div class="blog">
        <p>Some content before headings</p>
        <div id="toc></div>
        <h1 id="h1-1">H1-1</h1>
        <p>foo</p>
        <h2 id="h2-1">H2-1</h2>
        <span>bar</span>
        <h3 id="h3-1">H3-1</h3>
        baz
        <h4 id="h4-1">H4-1</h4>
        <h5 id="h5-1">H5-1</h5>
        <h6 id="h6-1">H6-1</h6>
        <h4 id="h4-2">H4-2</h4>
        <h1 id="h1-2">H1-2</h1>
        <h2 id="h2-2">H2-2</h2>
      </div>
    </body>
  </html>`;

    defaultRouteDataConfig = {
      route: '/foo/bar',
      data: {
        language: 'de',
      },
      config: {
        toc: {
          blogAreaSelector: '.blog',
          insertSelector: '#toc',
          level: ['h2', 'h3'],
          heading: {
            tag: 'h2',
            defaultLang: 'de',
            title: {
              en: 'Table of contents',
              de: 'Inhalt',
            }
          }
        }
      }
    }
  });
  test('should return the heading level number', () => {
    tocPlugin(defaultValidHtml, defaultRouteDataConfig).then(html => {
      console.log(html);
      expect(html).toEqual(`<!DOCTYPE html>
  <html lang="de">
    <head>
      <base href="/">
      <meta charset="utf-8">
    </head>
    <body>
      <h1>Before Blog Main Content</h1>
      <div class="blog">
      <p>Some content before headings</p>
      <div id="toc></div>
      <h1 id="h1-1">H1-1</h1>
      <p>foo</p>
      <h2 id="h2-1">H2-1</h2>
      <span>bar</span>
      <h3 id="h3-1">H3-1</h3>
      baz
      <h4 id="h4-1">H4-1</h4>
      <h5 id="h5-1">H5-1</h5>
      <h6 id="h6-1">H6-1</h6>
      <h4 id="h4-2">H4-2</h4>
      <h1 id="h1-2">H1-2</h1>
      <h2 id="h2-2">H2-2</h2>
    </div>
  </body>
</html>`);
    });
  });
});