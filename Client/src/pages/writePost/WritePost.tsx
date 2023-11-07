import { useContext } from 'react';
import axios, { AxiosError } from 'axios';
import "./writepost.css";
import config from '../../../config';
import { useForm } from 'react-hook-form';
import PostsContext, { PostsContextType } from '../../context/PostsContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AuthContext, { AuthContextType } from '../../context/AuthContext';

type NewPostInputs = {
  fileInput: FileList,
  title: string,
  content: string,
  categories: string
};

const WritePost = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(
    PostsContext
  ) as PostsContextType;

  const { user } = useContext(
    AuthContext
  ) as AuthContextType;

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<NewPostInputs>();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token available. Please log in.');
  }

  const onSubmitClick = async (formData: NewPostInputs) => {
    if (!user) {
      alert('Please log in before creating a post.');
      return;
    }
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('categories', formData.categories);
      form.append('productImage', formData.fileInput[0], formData.fileInput[0].name);

      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      };

      const response = await axios.post(`${config.SERVER_URL}/api/posts/newPost`, form, header);

      if (response.status == 200) {
        let newPost = response.data;
        newPost.authorName = `${user?.firstName} ${user?.lastName}`
        addPost(newPost);
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
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      {user ? (
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
              {...register("fileInput", {
                required: "Field is required"
              })}
            />
            {watch('fileInput') && watch('fileInput').length > 0
              ? <strong>{watch('fileInput')[0].name}</strong>
              : <strong>Upload Image</strong>
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
              autoFocus={true}
            />
          </div>
          {errors.content && <span className="writeError" role="alert">{errors.content.message}</span>}
          <input value="Publish" className="writeSubmit" type="submit" />
        </form>
      ) :
        <div className="writeFormGroup writeInput">Please log in first</div>
      }
    </div>
  );
}

export default WritePost;