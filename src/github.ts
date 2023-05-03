export type GitHubApiResponse = {
	_links: {
		git: string;
		html: string;
		self: string;
	};
	download_url: string;
	git_url: string;
	html_url: string;
	name: string;
	path: string;
	sha: string;
	size: number;
	type: string;
	url: string;
}[];
