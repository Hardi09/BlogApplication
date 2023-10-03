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
const App = () => {
  const currentUser = true;
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={currentUser ? <Homepage /> : <Register />} />
        <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/write" element={currentUser ? <WritePost /> : <Login />} />
        <Route path="/userProfile" element={currentUser ? <UserProfile /> : <Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
