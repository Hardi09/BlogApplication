import WritePost from "./pages/writePost/WritePost";
import TopBar from "./components/topbar/TopBar";
import SinglePost from "./components/singlePost/SinglePost";
import Homepage from "./pages/homepage/Homepage";
import UserProfile from "./pages/userProfile/UserProfile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./pages/footer/Footer";
import axios from "axios";
import { useContext, useEffect } from "react";
import PostsContext, { PostsContextType } from "./context/PostsContext";
import config from "../config";
import EditPost from "./pages/editPost/EditPost";

const App = () => {
  const { setPosts } = useContext(
    PostsContext
  ) as PostsContextType;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${config.SERVER_URL}/api/posts/getPosts`);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/write" element={ <WritePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/userProfile" element={ <UserProfile /> } />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
