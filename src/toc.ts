import { RouteData } from '@scullyio/scully/routerPlugins/addOptionalRoutesPlugin';
import { logError, logWarn, yellow } from '@scullyio/scully/utils/log';
import { JSDOM } from 'jsdom';

export const headingLevel = (tag: string): number | null => {
  const match = tag.match(/(?!h)[123456]/g);
  return match && match.length ? Number(match[0]) : null;
};

export const tocPlugin = async (html: string, routeData: RouteData) => {
  const route = routeData.route;
  try {
    const dom = new JSDOM(html);
    const { window } = dom;
    const tocConfig = routeData.config.toc;

    /**
     * define insert point
     */
    let tocInsertPointSelector = '#toc';
    if (!tocConfig.insertSelector) {
      logWarn(`No "insertSelector" for "toc" provided, using default: "#id".`);
    } else {
      if (typeof tocConfig.insertSelector === 'string') {
        tocInsertPointSelector = tocConfig.insertSelector;
      } else {
        logError(
          `Option "insertSelector" for "toc" must be a string (e.g. "#toc").`,
        );
      }
    }

    /**
     * search for insert point
     */
    const insertPoint = window.document.querySelector(tocInsertPointSelector);
    // in case <div id="toc"></div> is not on the site
    if (!insertPoint) {
      logWarn(
        `Insert point with selector ${tocInsertPointSelector} not found. Skipping toc generation for route ${route}.`,
      );
      return html;
    }

    /**
     * get headings for toc generation
     */
    let levels = ['h2', 'h3'];
    if (!tocConfig.level) {
      logWarn(
        `Option "level" for "toc" not set, using default: "['h2', 'h3']".`,
      );
    } else {
      if (Array.isArray(tocConfig.level)) {
        levels = tocConfig.level;
      } else {
        logError(
          `Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`,
        );
      }
    }
    const possibleValues = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let selector = '';
    levels.forEach(level => {
      const lowerCased = level.toLowerCase();
      if (possibleValues.indexOf(lowerCased) === -1) {
        logWarn(
          `Level "${level}" is not valid. It should be one of ${JSON.stringify(
            possibleValues,
          )}.`,
        );
      } else {
        selector += tocConfig.blogAreaSelector
          ? `${tocConfig.blogAreaSelector}>${lowerCased},`
          : `${lowerCased},`;
      }
    });
    // remove leading and trailing comma
    selector = selector.replace(/(^,)|(,$)/g, '');
    const headers = window.document.querySelectorAll(selector);

    /**
     * build nested ul, li list
     */
    let previousTag: number | null;
    let toc = '';
    headers.forEach(c => {
      const level = headingLevel(c.tagName);
      const baseLiEl = `<li><a href="${route}#${c.id}">${c.textContent}</a></li>`;
      if (previousTag && level && level > previousTag) {
        toc += '<ul style="margin-bottom: 0px">';
      }
      if (previousTag && level && level < previousTag) {
        toc += '</ul>';
      }
      toc += baseLiEl;
      previousTag = level;
    });

    /**
     * append toc as child
     */
    const list = window.document.createElement('ul');
    list.innerHTML = toc;
    insertPoint.appendChild(list);

    /**
     * return new serialized HTML
     */
    return dom.serialize();
  } catch (e) {
    logWarn(`error in tocPlugin, didn't parse for route '${yellow(route)}'`);
  }
  // in case of failure return unchanged HTML to keep flow going
  return html;
};
