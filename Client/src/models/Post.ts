export type CommentType = {
  _id: string;
  content: string;
  author: string;
  authorName: string | undefined;
  postTime: string;
  likes: string[];
};

export type PostType = {
  _id: string;
  author: string;
  authorName: string | undefined;
  title: string;
  content: string;
  image: string;
  postTime: string;
  comments: CommentType[];
  categories: string;
  likes: string[];
};