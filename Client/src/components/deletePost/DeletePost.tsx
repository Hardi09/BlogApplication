import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Popup from "reactjs-popup";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PostsContext, { PostsContextType } from "../../context/PostsContext";

type DeletePostProps = {
    id: string;
}

const DeletePost = ({ id }: DeletePostProps) => {
    const navigate = useNavigate();
    const { deletePost } = useContext(
        PostsContext
    ) as PostsContextType;
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

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
            const response = await axios.post(`${config.SERVER_URL}/api/posts/deletePost/${id}`, {}, header);
            
            if (response.status == 200) {
                deletePost(id);
                navigate('/');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div style={{display: 'inline'}}>
            <FontAwesomeIcon 
                className="singlePostIcon" 
                icon={faTrashAlt} 
                onClick={() => setOpen(true)}
            />
            <Popup
                open={open}
                onClose={closeModal}
                closeOnDocumentClick 
            >
                <div>
                    <div className="header">Are you sure you want to delete this post?</div>
                    <button
                        className="button"
                        onClick={handleDelete}
                    >
                        Yes
                    </button>
                    <button
                        className="button"
                        onClick={closeModal}
                    >
                        No
                    </button>
                </div>
            </Popup>
        </div>
    );
};

// {
//     (close: () => void) => (
//         <div>
//             <div className="header">Are you sure you want to delete this post?</div>
//             <button
//                 className="button"
//                 onClick={() => {
//                     handleDelete();
//                 }}
//             >
//                 Yes
//             </button>
//             <button
//                 className="button"
//                 onClick={() => {
//                     close();
//                 }}
//             >
//                 No
//             </button>
//         </div>
//     )
// }

export default DeletePost;