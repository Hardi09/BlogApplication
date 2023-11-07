import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import CommentPost from "../comment/CommentPost";
import NewComment from "../newComment/NewComment";
import PostsContext, { PostsContextType } from "../../context/PostsContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import config from '../../../config';
import DeletePost from "../deletePost/DeletePost";
import AuthContext, { AuthContextType } from "../../context/AuthContext";
import axios from "axios";

const SinglePost = () =>{
  const [liked, setLiked] = useState(faHeart);
  const { posts, likePost } = useContext(
    PostsContext
  ) as PostsContextType;

  const { user } = useContext(
    AuthContext
  ) as AuthContextType;

  const location = useLocation();
  const title = location.pathname.split('/')[2];
  const post = posts.find(e => e.title == title);

  useEffect(() => {
    const alreadyLiked = post && user && post.likes.includes(user._id) ? faHeartSolid : faHeart;
    setLiked(alreadyLiked);
  }, [post]);

  if (!post) {
    return;
  }

  const imageUrl = `${config.SERVER_URL}/foodImages/${post.image}`;
  const parsedDate = new Date(post.postTime).toLocaleString();

  const handleLike = async () => {
    if (user && !post.likes.includes(user._id)) {
      const token = localStorage.getItem('token');

      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.post(
          `${config.SERVER_URL}/api/posts/likePost/${post._id}`,
          {},
          headers
        );

        if (res.status == 200) {
          likePost(post._id, user._id);
          setLiked(faHeartSolid);
        }
      } catch (err) {
        console.log("error");
      }
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src= {imageUrl}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}
          {user && user._id == post.author && (
          <div className="singlePostEdit">
              <Link className="singlePostIcon" to={`/edit/${title}`}>
                <FontAwesomeIcon  icon={faEdit} />
              </Link>
              <DeletePost id={post._id} />
          </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
                {post.authorName}
            </b>
          </span>
          <span>{parsedDate}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
        </p>
        <div className="singlePostLikes">
          <FontAwesomeIcon className="singlePostLikeIcon" icon={liked} onClick={handleLike} />
          <p>{post.likes.length}</p>
        </div>
      </div>
      <div className="singlePostComments">
        <h3 className="singlePostCommentsLabel">Comments:</h3>
        {post?.comments.map(e => 
          <CommentPost 
            key={e._id}
            postID={post._id}
            comment={e}
          />
        )}
        <NewComment id={post._id} />
      </div>
    </div>
  );
}

export default SinglePost;