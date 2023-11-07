import Header from "../../components/header/Header";
import { useState } from "react";
import Posts from "../../components/posts/Posts";
import "./homepage.css";
import SideBar from "../../components/sidebar/SideBar";
import { useContext } from "react";
import PostsContext, { PostsContextType } from "../../context/PostsContext";

const Homepage = () => {
  const { posts } = useContext(
    PostsContext
  ) as PostsContextType;

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      <Header />
      <div className="home">
        <Posts data={posts} selectedCategory={selectedCategory} />
        <SideBar
           posts={posts}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
}

export default Homepage;
