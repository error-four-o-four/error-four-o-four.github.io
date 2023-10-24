export type Link = {
	text: string;
	url: string;
	alt?: string;
};

const links: Readonly<Link[]> = [
	{
		text: 'GitHub',
		url: 'https://github.com/error-four-o-four',
	},
	{
		text: 'Discord',
		url: 'https://discordapp.com/users/790552703058837514',
	},
	{
		text: 'OpenProcessing',
		url: 'https://openprocessing.org/user/201401?view=sketches&o=48',
	},
	// {
	// 	title: 'Twitter',
	// 	siSlug: 'siTwitter',
	// 	url: 'https://twitter.com/error4094754562',
	// },
	{
		text: 'npm',
		url: 'https://www.npmjs.com/~http404',
	},
];

export default links;
