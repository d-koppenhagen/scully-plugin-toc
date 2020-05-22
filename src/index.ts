import { registerPlugin } from '@scullyio/scully';

import { tocPlugin } from './toc';
import { validator } from './toc-validator';

import { TocPlugin } from './constants';
export { TocConfig } from './interfaces';

registerPlugin('render', TocPlugin, tocPlugin, validator);

export const getTocPlugin = () => TocPlugin;
