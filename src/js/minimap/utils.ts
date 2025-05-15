import { assertInstanceOf } from '../../utils.js';
import { viewport } from '../viewport/viewport.js';
import { ctx, canvas, indicator, minimapScale } from './minimap.js';

import elements from '../elements.js';

export const toMinimapWidth = (n: number) =>
	Math.floor((n / viewport.characterWidth) * minimapScale);

export const toMinimapHeight = (n: number) =>
	Math.floor(
		(n / viewport.characterHeight) * viewport.characterRatio * minimapScale
	);

export const resizeMinimap = () => {
	canvas.width = toMinimapWidth(viewport.contentWidth);
	canvas.height = toMinimapHeight(viewport.contentHeight);

	const indicatorHeight = toMinimapHeight(viewport.windowHeight);
	indicator.style.height = `${indicatorHeight}px`;
};

const getColor = (element: Element) => getComputedStyle(element).color;

const drawDOMRect = ({ x, y, width, height }: DOMRect, color: string) => {
	// @todo sub container margin left
	x -= elements.main.offsetLeft;
	y += elements.container.scrollTop;

	[x, width] = [x, width].map((n) => toMinimapWidth(n));
	[y, height] = [y, height].map((n) => toMinimapHeight(n));

	ctx.fillStyle = color;
	ctx.moveTo(x, y);
	ctx.fillRect(x, y, width, height);
};

const drawThumbnailElement = (element: Element) => {
	assertInstanceOf(element, HTMLElement);

	const color = 'rgb(34, 34, 34)';
	const rect = element.getBoundingClientRect();
	drawDOMRect(rect, color);
};

const drawCommentElement = (element: Element) => {
	assertInstanceOf(element, HTMLElement);

	const color = getColor(element);
	const range = document.createRange();

	for (const node of element.childNodes) {
		if (node.nodeType !== 3 || !node.textContent) continue;

		const rects = [];

		node.textContent = node.textContent.trim().replace(/\s+/g, ' ');
		range.setStart(node, 0);
		range.setEndAfter(node);

		const nodeRect = range.getBoundingClientRect();

		// add pseudo slashes
		for (
			let y = nodeRect.y;
			y < nodeRect.y + nodeRect.height;
			y += viewport.lineHeight
		) {
			rects.push(
				new DOMRect(
					nodeRect.x - 3 * viewport.characterWidth,
					y,
					2 * viewport.characterWidth,
					viewport.characterHeight
				)
			);
		}

		// add words
		for (let i = 0, ii = node.textContent.length; i < ii; i += 1) {
			const character = node.textContent[i];

			if (i < ii - 1 && !/\s/.test(character)) continue;

			range.setEnd(node, i);
			rects.push(range.getBoundingClientRect());

			if (i + 1 < ii) {
				range.setStart(node, i + 1);
			}
		}

		for (const rect of rects) {
			drawDOMRect(rect, color);
		}
	}
};

export const renderMinimap = (collection: HTMLCollection) => {
	for (const element of collection) {
		if (element.classList.contains('comment')) {
			drawCommentElement(element);
			continue;
		}

		if (element.classList.contains('project__thumb')) {
			drawThumbnailElement(element);
			continue;
		}

		if (element.children.length > 0) {
			renderMinimap(element.children);
			continue;
		}

		if (element.localName === 'br') continue;

		const rect = element.getBoundingClientRect();

		// element might not be displayed because of media query
		if (rect.width === 0 || rect.height === 0) continue;

		drawDOMRect(rect, getColor(element));
	}
};
