export class Article {
    id?: number;
    title: string;
    imageLink: string;
    author: string;
    content: string;
    date: Date;
    tags: string;
    comments?: any[];
    readingTime: number;
    preview: string;
  }
