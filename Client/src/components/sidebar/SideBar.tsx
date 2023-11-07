import { Link } from 'react-router-dom';
import './sidebar.css';
import { PostType } from '../../models/Post';

interface SidebarProps {
  posts: PostType[];
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
}

const SideBar = (props: SidebarProps) => {
  const { posts, setSelectedCategory } = props;

  // Extract unique categories from the posts
  const categories = [...new Set(posts.map(post => post.categories))];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://i0.wp.com/blog.ericturner.it/wp-content/uploads/2019/03/cropped-myAvatar.png?fit=512%2C512&ssl=1"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse. Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category, index) => (
            <li className="sidebarListItem" key={index}>
              <Link 
                className="linkItem" 
                to={`/posts?cat=${category}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa fa-facebook-square"></i>
          <i className="sidebarIcon fa fa-instagram-square"></i>
          <i className="sidebarIcon fa fa-pinterest-square"></i>
          <i className="sidebarIcon fa fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
