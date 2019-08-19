export interface IPhotos {
	title: string;
	modified: Date;
	items: [IDetails];
}

export interface IDetails {
	title: string;
	media: IMedia;
	date_taken: Date;
	description: string;
	published: string;
	author: string;
	author_id: string;
	tags: string;
}

export interface IMedia {
	m: string;
}