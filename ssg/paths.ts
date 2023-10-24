import path from 'node:path';

const root = process.cwd();

const folders = ['ssg', 'src', 'public'] as const;

const paths = folders.reduce(
	(all, item) => Object.assign(all, { [item]: path.resolve(root, item) }),
	{} as Paths
);

const { ssg, src, public: pub } = paths;

export { root, ssg, src, pub };

export default {
	root,
	ssg,
	src,
	pub,
};

type Folder = (typeof folders)[number];

type Paths = {
	[F in Folder]: string;
};
