import { registerPlugin } from '@scullyio/scully';

import { TocPluginName } from './constants';
import { tocPlugin } from './toc';
import { validator } from './validator';

declare var require: any;

/**
 * register the plugin
 */
registerPlugin('render', TocPluginName, tocPlugin, validator);

export const getTocPlugin = () => TocPluginName;
