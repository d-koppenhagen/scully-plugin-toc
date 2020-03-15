import { registerPlugin } from '@scullyio/scully';
import { tocPlugin } from './toc';
import { validator } from './toc-validator';

export const TOC = 'toc';

registerPlugin('render', TOC, tocPlugin, validator);
