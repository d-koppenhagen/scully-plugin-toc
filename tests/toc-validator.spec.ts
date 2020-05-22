import { validator } from '../src/toc-validator';
import { TocConfig } from '../src/interfaces';
import { getTocPlugin } from '../src/index';
import { setPluginConfig } from '@scullyio/scully';

describe('validator', () => {
  let options: TocConfig;
  let TocPlugin: any;

  beforeEach(() => {
    TocPlugin = getTocPlugin();
    options = {
      blogAreaSelector: '.blog',
      insertSelector: '#toc',
      level: ['h2', 'h3'],
    };
  });
  test('should return an empty array when config is valid', async () => {
    setPluginConfig(TocPlugin, options);
    const validationResult = await validator();
    expect(validationResult).toHaveLength(0);
  });

  test('should return an error when "insertSelector" is en empty string', async () => {
    setPluginConfig(TocPlugin, { ...options, insertSelector: '' });
    const validationResult = await validator();
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      'Option "insertSelector" for "toc" must be a valid string (e.g. "#toc").',
    );
  });

  test('should return an error when "blogAreaSelector" is en empty string', async () => {
    setPluginConfig(TocPlugin, { ...options, blogAreaSelector: '' });
    const validationResult = await validator();
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      'Option "blogAreaSelector" for "toc" must be a valid string (e.g. ".blog-content").',
    );
  });

  test('should return an error when level array length is 0', async () => {
    setPluginConfig(TocPlugin, { ...options, level: [] });
    const validationResult = await validator();
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0]).toEqual(
      `Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`,
    );
  });
});
