import { faTrashAlt, faEdit, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import "./commentpost.css";
import { useContext, useState } from "react";
import axios from "axios";
import config from "../../../config";
import PostsContext, { PostsContextType } from "../../context/PostsContext";
import AuthContext, { AuthContextType } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { CommentType } from "../../models/Post";

type EditCommentInputs = {
    content: string
};

// type CommentProps = {
//     postID: string,
//     id: string,
//     content: string,
//     date: string,
//     author: string,
//     likes: string[]
// };
type CommentProps = {
    postID: string
    comment: CommentType
};

const CommentPost = ({ postID, comment }: CommentProps) => {
    const { editComment, deleteComment, likeComment } = useContext(
        PostsContext
    ) as PostsContextType;

    const { user } = useContext(
        AuthContext
    ) as AuthContextType;

    const {
        register,
        handleSubmit,
        setValue,
        setError,
    } = useForm<EditCommentInputs>();

    const alreadyLiked = faHeart;// user && comment.likes.includes(user._id) ? faHeartSolid : faHeart;
    const [liked, setLiked] = useState(alreadyLiked);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const closeEditingModal = () => setEditing(false);
    const closeDeletingModal = () => setDeleting(false);
    const parsedDate = new Date(comment.postTime).toLocaleString();

    const handleOpenEditing = () => {
        setValue('content', comment.content);
        setEditing(true);
    }

    const handleEdit = async (formData: EditCommentInputs) => {
        const token = localStorage.getItem('token');

        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };

        const data = {
            content: formData.content,
        };

        try {
            const res = await axios.post(
                `${config.SERVER_URL}/api/posts/editComment/${postID}/${comment._id}`,
                data,
                headers
            );

            if (res.status == 200) {
                editComment(postID, comment._id, formData.content);
                setEditing(false);
            }
        } catch (err) {
            setError("content", {
                type: "manual",
                message: "Server error"
            });
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token available. Please log in.');
        }

        try {
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.post(`${config.SERVER_URL}/api/posts/deleteComment/${postID}/${comment._id}`, {}, header);
            if (response.status == 200) {
                deleteComment(postID, comment._id);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleLike = async () => {
        if (user && !comment.likes.includes(user._id)) {
            const token = localStorage.getItem('token');

            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            try {
                const res = await axios.post(
                    `${config.SERVER_URL}/api/posts/likeComment/${postID}/${comment._id}`,
                    {},
                    headers
                );

                if (res.status == 200) {
                    likeComment(postID, comment._id, user._id);
                    setLiked(faHeartSolid);
                }
            } catch (err) { }
        }
    }

    return (
        <div className="commentWrapper">
            <div className="commentInfo">
                <span className="commentAuthor">Author: {comment.authorName}</span>
                <span className="commentDate">{parsedDate}</span>
            </div>
            {user && user._id == comment.author && (
                <div className="singlePostEdit">
                    <FontAwesomeIcon
                        className="commentIcon commentEdit"
                        icon={faEdit}
                        onClick={handleOpenEditing}
                    />
                    <Popup
                        open={editing}
                        onClose={closeEditingModal}
                        closeOnDocumentClick
                    >
                        <div>
                            <h3>Update Comment:</h3>
                            <form onSubmit={handleSubmit(handleEdit)}>
                                <textarea
                                    id="content"
                                    cols={40}
                                    rows={5}
                                    {...register("content", {
                                        required: "Field is required"
                                    })}
                                />
                                <button className="button" type="submit">Submit</button>
                            </form>
                            <button
                                className="button"
                                onClick={closeEditingModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </Popup>
                    <FontAwesomeIcon
                        className="commentIcon commentDelete"
                        icon={faTrashAlt}
                        onClick={() => setDeleting(true)}
                    />
                    <Popup
                        open={deleting}
                        onClose={closeDeletingModal}
                        closeOnDocumentClick
                    >
                        <div>
                            <div className="header">Are you sure you want to delete this comment?</div>
                            <button
                                className="button"
                                onClick={handleDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="button"
                                onClick={closeDeletingModal}
                            >
                                No
                            </button>
                        </div>
                    </Popup>
                </div>
            )}
            <p className="commentContent">{comment.content}</p>
            <div className="commentLikes">
                <FontAwesomeIcon className="commentIcon" icon={liked} onClick={handleLike} />
                <p>{comment.likes ? comment.likes.length : 0}</p>
            </div>
        </div>
    );
};

export default CommentPost;