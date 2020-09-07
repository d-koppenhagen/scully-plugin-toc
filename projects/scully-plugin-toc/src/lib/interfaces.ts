export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TocConfig {
  trailingSlash?: boolean;
  blogAreaSelector?: string;
  insertSelector?: string;
  level?: Level[];
  scrollIntoViewOnClick?: boolean;
}
