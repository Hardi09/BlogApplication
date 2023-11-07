import { Link } from "react-router-dom";
import "./topbar.css";
import AuthContext from "../../context/AuthContext"; // Import the authContext
import { useContext } from "react";

const TopBar = () => {
  const authContext = useContext(AuthContext);
  const user = true;
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            {/*<Link className="link" to="/login">LOGIN</Link> */}

            {authContext && authContext.user ? (
              <Link className="link" to="/" onClick={authContext.logout}>
                LOGOUT
              </Link>
            ) : (
              <Link className="link" to="/login">
                LOGIN
              </Link>
            )}
          </li>
          {/* {user && <li className="topListItem">LOGOUT</li>} */}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/userProfile">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
       
      </div>
    </div>
  );
};

export default TopBar;
