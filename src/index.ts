import { registerPlugin } from '@scullyio/scully';
import { tocPlugin } from './toc';

const validator = async () => [];
registerPlugin('render', 'toc', tocPlugin, validator);
