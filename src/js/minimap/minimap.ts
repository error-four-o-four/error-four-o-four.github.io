import elements from '../elements.js';

const { minimap, minimapWrap, minimapIndicator } = elements;

const minimapScale = 1;

const ctx = <CanvasRenderingContext2D>minimap.getContext('2d');

export {
	ctx,
	minimap as canvas,
	minimapWrap as wrapper,
	minimapIndicator as indicator,
	minimapScale,
};
