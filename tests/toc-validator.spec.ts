import { validator } from '../src/toc-validator';
import { TocHandledRoute } from '../src/interfaces';

describe('validator', () => {
  let cfg: TocHandledRoute;

  beforeEach(() => {
    cfg = {
      type: '',
      route: '/foo/bar',
      data: {
        language: 'de',
      },
      config: {
        toc: {
          blogAreaSelector: '.blog',
          insertSelector: '#toc',
          level: ['h2', 'h3'],
        },
      },
    };
  });
  test('should return an empty array when config is valid', async () => {
    const validationResult = await validator(cfg);
    expect(validationResult).toHaveLength(0);
  });

  test('should return an error when "insertSelector" is en empty string', async () => {
    cfg.config.toc.insertSelector = '';
    const validationResult = await validator(cfg);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      'Option "insertSelector" for "toc" must be a valid string (e.g. "#toc").',
    );
  });

  test('should return an error when "blogAreaSelector" is en empty string', async () => {
    cfg.config.toc.blogAreaSelector = '';
    const validationResult = await validator(cfg);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      'Option "blogAreaSelector" for "toc" must be a valid string (e.g. ".blog-content").',
    );
  });

  test('should return an error when level array length is 0', async () => {
    cfg.config.toc.level = [];
    const validationResult = await validator(cfg);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      `Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`,
    );
  });
});
