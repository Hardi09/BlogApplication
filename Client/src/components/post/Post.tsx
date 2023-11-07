import { Link } from 'react-router-dom';
import './post.css';
import { PostType } from '../../models/Post';
import config from '../../../config';

interface PostProps {
  data: PostType;
  selectedCategory: string 
}

const Post = (props: PostProps) => {
  const { data } = props;
  const imageUrl = `${config.SERVER_URL}/foodImages/${data.image}`;
  const parsedDate = new Date(data.postTime).toLocaleString();

  return (
    
    <div className="post">
      <img
        className="postImg"
        src={imageUrl}
        alt=""
      />
      <div className="postInfo">
      <div className="postCats">
        {data.categories}
        </div>
        <span className="postTitle">
          <Link to={`/post/${data.title}`} className="linkItem">
            {data.title}
          </Link>
        </span>
        <div className='postId'>
          <p>Author: {data.authorName}</p>
        </div>
        <hr />
        <span className="postDate">{parsedDate}</span>
      </div>
      <p className="postDesc">{data.content}</p>
    </div>
  );
};

export default Post;
