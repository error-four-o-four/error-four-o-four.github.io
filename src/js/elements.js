const getElementsFromIds = (all, id) => {
	all[id.split('-')[1]] = document.querySelector(id);
	return all;
};

const sections = ['#section-welcome', '#section-projects', '#section-about'].reduce(getElementsFromIds, {});

const pfpBg = document.getElementById('img-pfp-bg');
const pfp = document.getElementById('img-pfp');

const cards = [...document.querySelectorAll('.project-card')];

const uls = ['#ul-navbar', '#ul-languages', '#ul-environments', '#ul-certificates', '#ul-socials'].reduce(
	getElementsFromIds,
	{}
);

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
	cards,
	uls,
	links,
};
