import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { CommentType, PostType } from "../models/Post";

export type PostsContextType = {
    posts: PostType[];
    setPosts: Dispatch<SetStateAction<PostType[]>>;
    addPost: (post: PostType) => void;
    editPost: (post: PostType) => void;
    deletePost: (postID: string) => void;
    likePost: (postID: string, userID: string) => void;
    addComment: (postID: string, comment: CommentType) => void;
    editComment: (postID: string, id: string, content: string) => void;
    deleteComment: (postID: string, id: string) => void;
    likeComment: (postID: string, id: string, userID: string) => void;
};

const PostsContext = createContext<PostsContextType | null>(null);

const PostsContextProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<PostType[]>([]);

    const addPost = (post: PostType) => {
        const copyPosts = [...posts];
        copyPosts.push(post);
        setPosts(copyPosts);
    }

    const editPost = (post: PostType) => {
        const copyPosts = [...posts];
        const i = copyPosts.findIndex(e => e._id == post._id);
        if (i >= 0) {
            copyPosts[i] = post;
            setPosts(copyPosts);
        }
    }

    const deletePost = (postID: string) => {
        const copyPosts = posts.filter(e => e._id != postID);
        setPosts(copyPosts);
    }

    const likePost = (postID: string, userID: string) => {
        const copyPosts = [...posts];
        const post = copyPosts.find(e => e._id == postID);
        if (post && !post.likes.includes(userID)) {
            post.likes.push(userID);
            setPosts(copyPosts);
        }
    }

    const addComment = (postID: string, comment: CommentType) => {
        const copyPosts = [...posts];
        copyPosts.find(e => e._id == postID)?.comments.push(comment);
        setPosts(copyPosts);
    }

    const editComment = (postID: string, id: string, content: string) => {
        const copyPosts = [...posts];
        let post = copyPosts.find(e => e._id == postID);
        let comment = post?.comments.find(e => e._id == id);
        if (post && comment) {
            comment.content = content;
            setPosts(copyPosts);
        }
    }

    const deleteComment = (postID: string, id: string) => {
        const copyPosts = [...posts];
        let post = copyPosts.find(e => e._id == postID);
        if (post?.comments) {
            post.comments = post.comments.filter(e => e._id != id);
            setPosts(copyPosts);
        }
    }

    const likeComment = (postID: string, id: string, userID: string) => {
        const copyPosts = [...posts];
        const post = copyPosts.find(e => e._id == postID);
        const comment = post?.comments.find(e => e._id == id);
        if (post && comment && !comment.likes.includes(userID)) {
            comment.likes.push(userID);
            setPosts(copyPosts);
        }
    }

    return (
        <PostsContext.Provider
            value={{
                posts,
                setPosts,
                addPost,
                editPost,
                deletePost,
                likePost,
                addComment,
                editComment,
                deleteComment,
                likeComment
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;
export { PostsContextProvider };