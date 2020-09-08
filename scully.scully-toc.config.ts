import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import {
  getTocPlugin,
  TocConfig,
  TocPluginName,
} from './dist/scully-plugin-toc';

/**
 * configuration for the TOC plugin
 */
const tocOptions: TocConfig = {
  blogAreaSelector: '.blog-content',
  insertSelector: '#toc',
  level: ['h2', 'h3', 'h4'],
  trailingSlash: true,
  scrollIntoViewOnClick: true,
};
const TocPlugin = getTocPlugin();
setPluginConfig(TocPlugin, tocOptions);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-toc',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [TocPluginName],
      slug: {
        folder: './blog',
      },
    },
  },
};
