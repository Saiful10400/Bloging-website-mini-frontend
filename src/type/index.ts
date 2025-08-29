export interface tBlogPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
}
export default tBlogPost;