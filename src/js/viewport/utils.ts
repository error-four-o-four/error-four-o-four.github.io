import elements from '../elements.js';

const { body } = document;

export const getWindowWidth = () => window.innerWidth || body.clientWidth;
export const getWindowHeight = () => window.innerHeight || body.clientHeight;

export const getLineHeight = () => parseInt(getComputedStyle(body).lineHeight);

export const getCharacterDimensions = () => {
	const node = document.createElement('span');
	node.innerHTML = '&nbsp;';
	elements.content.append(node);

	const rect = node.getBoundingClientRect();
	node.remove();

	return [rect.width, rect.height, rect.height / rect.width];
};
