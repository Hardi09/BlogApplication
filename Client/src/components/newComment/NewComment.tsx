import { useForm } from "react-hook-form";
import { useContext } from "react";
import axios from "axios";
import "./newcomment.css";
import config from '../../../config';
import PostsContext, { PostsContextType } from "../../context/PostsContext";
import AuthContext, { AuthContextType } from "../../context/AuthContext";

type NewCommentInputs = {
    content: string
};

type NewCommentProps = {
    id: string;
}

const NewComment = ({ id }: NewCommentProps) => {
    const { addComment } = useContext(
        PostsContext
    ) as PostsContextType;

    const { user } = useContext(
        AuthContext
    ) as AuthContextType;

    const {
        register,
        handleSubmit,
        setError,
        reset
    } = useForm<NewCommentInputs>();

    const onSubmitClick = async (formData: NewCommentInputs) => {
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
                `${config.SERVER_URL}/api/posts/newComment/${id}`,
                data,
                headers
            );

            if (res.status == 200) {
                let newComment = res.data;
                newComment.authorName = `${user?.firstName} ${user?.lastName}`
                addComment(id, newComment);
                reset();
            }
        } catch (err) {
            setError("content", {
                type: "manual",
                message: "Server error"
            });
        }
    };

    return (
        <div>
            {user &&
                (<div className="newCommentWrapper">
                    <h3>Add Comment:</h3>
                    <form onSubmit={handleSubmit(onSubmitClick)}>
                        <textarea
                            id="content"
                            cols={40}
                            rows={5}
                            {...register("content", {
                                required: "Field is required"
                            })}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>)}
        </div>
    );
};

export default NewComment;