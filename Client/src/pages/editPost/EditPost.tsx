import { useContext, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import "../writePost/writepost.css";
import config from '../../../config';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import PostsContext, { PostsContextType } from '../../context/PostsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AuthContext, { AuthContextType } from '../../context/AuthContext';

type EditPostInputs = {
  fileInput: FileList,
  title: string,
  content: string,
  categories: string
};

const EditPost = () => {
  const { posts, editPost } = useContext(
    PostsContext
  ) as PostsContextType;

  const { user } = useContext(
    AuthContext
  ) as AuthContextType;

  const navigate = useNavigate();
  const location = useLocation();
  const title = location.pathname.split('/')[2];
  const post = posts.find(e => e.title == title);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm<EditPostInputs>();

  useEffect(() => {
    setValue('title', post ? post.title : '');
    setValue('content', post ? post.content : '');
    setValue('categories', post ? post.categories : '');
  }, [post]);
 
  if (!post) {
    return;
  }

  const imageUrl = `${config.SERVER_URL}/foodImages/${post.image}`;
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token available. Please log in.');
  }

  const onSubmitClick = async (formData: EditPostInputs) => {
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('categories', formData.categories);

      if (formData.fileInput[0]) {
        form.append('productImage', formData.fileInput[0], formData.fileInput[0].name);
      }

      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      };

      const response = await axios.post(`${config.SERVER_URL}/api/posts/editPost/${post._id}`, form, header);

      if (response.status == 200) {
        let newPost = response.data;
        newPost.authorName = `${user?.firstName} ${user?.lastName}`
        editPost(newPost);
        navigate(`/post/${formData.title}`);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      setError("content", {
        type: "manual",
        message: err.response ? err.response.data as string : err.message
      });
    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src={imageUrl}
        alt=""
      />
      {user && user._id == post.author ? (
        <form className="writeForm" onSubmit={handleSubmit(onSubmitClick)}>
          <div className="writeFormGroup">
            <label className="writeInput" htmlFor="fileInput">
              <FontAwesomeIcon className="writeIcon" icon={faPlus} />
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".png,.jpg"
              style={{ display: "none" }}
              {...register("fileInput")}
            />
            {watch('fileInput') && watch('fileInput').length > 0
              ? <strong>{watch('fileInput')[0].name}</strong>
              : <strong>Upload New Image or Leave Empty</strong>
            }
          </div>
          <div className="writeFormGroup">
            <input
              id='title'
              className="writeInput"
              placeholder="Title"
              type="text"
              {...register("title", {
                required: "Field is required"
              })}
              autoFocus={true}
            />
          </div>
          {errors.title && <span className="writeError" role="alert">{errors.title.message}</span>}
          <div className="writeFormGroup">
            <select className="writeInput" defaultValue='Other' {...register("categories")}>
              <option value="Mexican Food">Mexican Food</option>
              <option value="Italian Food">Italian Food</option>
              <option value="Indian Food">Indian Food</option>
              <option value="Chinese Food">Chinese Food</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="writeFormGroup">
            <textarea
              id='content'
              className="writeInput writeText"
              placeholder="Tell your story..."
              {...register("content", {
                required: "Field is required"
              })}
            />
          </div>
          {errors.content && <span className="writeError" role="alert">{errors.content.message}</span>}
          <input value="Publish" className="writeSubmit" type="submit" />
        </form>
      ) :
        <div className="writeFormGroup writeInput">Cannot edit someone else's post</div>
      }
    </div>
  );
};

export default EditPost;