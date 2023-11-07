import Post from '../post/Post';
import './posts.css';
import { PostType } from '../../models/Post';

interface PostsProps {
  data: PostType[] | undefined;
  selectedCategory: string // Make it optional
}
const Posts = (props: PostsProps) => {
  const { data, selectedCategory } = props;

  const filterPostsByCategory = (posts: PostType[], category: string) => {
    if (category) {
      return posts.filter(post => post.categories.includes(category));
    } else {
      return posts; // Return all posts if no category is selected
    }
  };
  
  const filteredPosts = filterPostsByCategory(data || [], selectedCategory);
  return (
    <div className="posts">
    {filteredPosts.map(post => (
      <Post key={post._id} data={post} selectedCategory={selectedCategory} />
    ))}
  </div>
  );
}

export default Posts;
