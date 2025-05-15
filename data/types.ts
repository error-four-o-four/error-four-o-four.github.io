export type Link = {
	text: string;
	url: string;
};

export type ProjectBase = {
	title: string;
	descr: string;
	links: ProjectLinks;
	tags?: string[];
};

export type Project = ProjectBase & {
	image?: ProjectImage;
	thumb?: string;
};

export type ProjectImage = {
	src: string;
	width: number;
	height: number;
};

export type ProjectLinks = {
	repo: string;
	demo?: string;
};

export type Certificate = Link & {
	titleSmall?: string;
};
