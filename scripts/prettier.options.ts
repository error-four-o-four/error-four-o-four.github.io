import { type Options } from 'prettier';
import prettierrc from '../.prettierrc.json' assert { type: 'json' };

export const jsParserOptions = Object.assign(
	<Options>{
		parser: 'espree',
	},
	prettierrc
);

export const htmlParserOptions = Object.assign(
	<Options>{
		parser: 'html',
	},
	prettierrc
);
