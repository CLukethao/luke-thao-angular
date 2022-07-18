

export interface IPost {
  id: string;
  date: string;
  author: string;
  title: string;
  description: string;
  comments: Array<IComment>
}

export interface IComment {
  id: string,
  date: string;
  user: string;
  text: string;
}
