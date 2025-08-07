export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	published: boolean;
	tags: string[];
	image?: string;
	readingTime?: number;
}

export interface BlogPostWithContent extends BlogPost {
	content: string;
}

export interface BlogMetadata {
	title: string;
	description: string;
	date: string;
	published: boolean;
	tags: string[];
	image?: string;
}