import { registerPlugin } from '@scullyio/scully';
import { tocPlugin } from './toc';

export const TOC = 'toc';
const validator = async () => [];
registerPlugin('render', TOC, tocPlugin, validator);
