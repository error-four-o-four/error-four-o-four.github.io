import { getCharacterDimensions, getLineHeight } from './utils.js';

const updateThreshold = 2;

const mqThreshold = 960;

export const viewport = {
	windowWidth: 0,
	windowHeight: 0,
	characterWidth: 0,
	characterHeight: 0,
	characterRatio: 0,
	lineHeight: 0,
	contentWidth: 0,
	contentHeight: 0,
	skipUpdate(newWindowWidth: number, newWindowHeight: number) {
		const deltaWidth = Math.abs(this.windowWidth - newWindowWidth);
		const deltaHeight = Math.abs(this.windowHeight - newWindowHeight);
		return (
			(deltaWidth < updateThreshold && deltaHeight === 0) ||
			(deltaWidth === 0 && deltaHeight < updateThreshold)
		);
	},
	triggeredMediaQuery(newWindowWidth: number) {
		return (
			(viewport.windowWidth >= mqThreshold && newWindowWidth < mqThreshold) ||
			(viewport.windowWidth < mqThreshold && newWindowWidth >= mqThreshold)
		);
	},
	onFontSizeHasChanged() {
		const [w, h, r] = getCharacterDimensions();
		this.characterWidth = w;
		this.characterHeight = h;
		this.characterRatio = r;
		this.lineHeight = getLineHeight();
	},
};
