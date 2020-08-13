import { HandledRoute, setPluginConfig } from '@scullyio/scully';
import { getTocPlugin } from './index';
import { Level, TocConfig } from './interfaces';
import { headingLevel, tocPlugin } from './toc';

describe('headingLevel', () => {
  it('should return the heading level number', () => {
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
  let defaultRouteDataConfig: HandledRoute;
  let tocConfig: TocConfig;
  let TocPlugin: any;

  const resultStart = `<html><head></head><body>
  <h1>Before Blog Main Content</h1>
  <div class="blog">
    <p>Some content before headings</p>
    `;
  const resultEnd = `
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
</body></html>`;

  beforeEach(() => {
    defaultValidHtml = `<body>
  <h1>Before Blog Main Content</h1>
  <div class="blog">
    <p>Some content before headings</p>
    <div id="toc"></div>
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
</body>`;

    defaultRouteDataConfig = {
      type: '',
      route: '/foo/bar',
      data: {
        language: 'de',
      },
    };

    tocConfig = {
      blogAreaSelector: '.blog',
      insertSelector: '#toc',
      level: ['h2', 'h3'],
      trailingSlash: false,
    };
    TocPlugin = getTocPlugin();
  });
  it('should return the HTML including TOC by respecting the configured options', async () => {
    const html = await tocPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toEqual(
      `${resultStart}<div id="toc"><ul><li><a href="/foo/bar#h2-1">H2-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h3-1">H3-1</a></li></ul><li><a href="/foo/bar#h2-2">H2-2</a></li></ul></div>${resultEnd}`,
    );
  });

  it('should include a trailing slash in genertaed links by setting "trailingSlash" to "true"', async () => {
    const options = { ...tocConfig };
    options.trailingSlash = true;
    setPluginConfig(TocPlugin, options);
    const html = await tocPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toMatch(/\/foo\/bar\/\#h/);
  });

  it('should return the HTML including TOC by using default "blogAreaSelector"', async () => {
    const options = { ...tocConfig };
    options.blogAreaSelector = '';
    options.level = ['h1', 'h2', 'h3'];
    setPluginConfig(TocPlugin, options);
    const html = await tocPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toEqual(
      `${resultStart}<div id="toc"><ul><li><a href="/foo/bar#">Before Blog Main Content</a></li><li><a href="/foo/bar#h1-1">H1-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h2-1">H2-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h3-1">H3-1</a></li></ul><li><a href="/foo/bar#h1-2">H1-2</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h2-2">H2-2</a></li></ul></ul></ul></div>${resultEnd}`,
    );
  });

  it('should return the HTML including TOC by specify level option', async () => {
    const options = { ...tocConfig };
    options.level = ['h4', 'h5', 'h6', 'invalid' as Level];
    setPluginConfig(TocPlugin, options);
    const html = await tocPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toEqual(
      `${resultStart}<div id="toc"><ul><li><a href="/foo/bar#h4-1">H4-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h5-1">H5-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h6-1">H6-1</a></li></ul><li><a href="/foo/bar#h4-2">H4-2</a></li></ul></ul></div>${resultEnd}`,
    );
  });

  it('should insert TOC into element with id "toc" by default', async () => {
    const options = { ...tocConfig };
    options.insertSelector = '';
    setPluginConfig(TocPlugin, options);
    const html = await tocPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toEqual(
      `${resultStart}<div id="toc"><ul><li><a href="/foo/bar#h2-1">H2-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h3-1">H3-1</a></li></ul><li><a href="/foo/bar#h2-2">H2-2</a></li></ul></div>${resultEnd}`,
    );
  });

  it('should insert TOC into specific element', async () => {
    const options = { ...tocConfig };
    options.insertSelector = '.foo';
    const inputHtml = defaultValidHtml.replace('id="toc"', 'class="foo"');
    setPluginConfig(TocPlugin, options);
    const html = await tocPlugin(inputHtml, defaultRouteDataConfig);
    expect(html).toEqual(
      `${resultStart}<div class="foo"><ul><li><a href="/foo/bar#h2-1">H2-1</a></li><ul style="margin-bottom: 0px"><li><a href="/foo/bar#h3-1">H3-1</a></li></ul><li><a href="/foo/bar#h2-2">H2-2</a></li></ul></div>${resultEnd}`,
    );
  });
});
