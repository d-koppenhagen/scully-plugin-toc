import { HandledRoute } from '@scullyio/scully/routerPlugins/addOptionalRoutesPlugin';

export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TocOptions {
  blogAreaSelector: string;
  insertSelector: string;
  level: Level[];
}

export interface TocHandledRoute extends HandledRoute {
  config: {
    toc: TocOptions;
  };
}
