import { TocHandledRoute } from './interfaces';

export function validator(options: TocHandledRoute) {
  const tocConfig = options.config.toc;
  const errors: string[] = [];

  if (!tocConfig.insertSelector.length) {
    errors.push(
      'Option "insertSelector" for "toc" must be a valid string (e.g. "#toc").',
    );
  }

  if (!tocConfig.blogAreaSelector.length) {
    errors.push(
      'Option "blogAreaSelector" for "toc" must be a valid string (e.g. ".blog-content").',
    );
  }

  if (tocConfig.level && !tocConfig.level.length) {
    errors.push(
      `Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`,
    );
  }

  return errors;
}
