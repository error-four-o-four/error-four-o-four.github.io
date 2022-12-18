const getElementsFromIds = (all, id) => ({
	...all,
	[id.split('-')[1]]: document.querySelector(id),
});

const sections = [
	'#section-welcome',
	'#section-projects',
	'#section-about',
].reduce(getElementsFromIds, {});


const pfpBg = document.getElementById('img-pfp-bg');
const pfp = document.getElementById('img-pfp');

const projects = [];

const uls = [
	'#ul-navbar',
	'#ul-languages',
	'#ul-frameworks',
	'#ul-certificates',
	'#ul-socials',
].reduce(getElementsFromIds, {});

const links = {
	navbar: [...uls.navbar.querySelectorAll('a')],
	languages: [],
	frameworks: [],
	certificates: [],
	socials: [],
};

export default {
	sections,
	pfpBg,
	pfp,
	projects,
	uls,
	links,
};
