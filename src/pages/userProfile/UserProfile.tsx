import "./userprofile.css";
import SideBar from "../../components/sidebar/SideBar";

const UserProfile= () =>{
  return (
    <div className="user">
      <div className="userWrapper">
        <div className="userTitle">
          <span className="userTitleUpdate">Update Your Account</span>
          <span className="userTitleDelete">Delete Account</span>
        </div>
        <form className="userForm">
          <label>Profile Picture</label>
          <div className="userPP">
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="userPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="userPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="user" name="name" />
          <label>Email</label>
          <input type="email" placeholder="user@gmail.com" name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" />
          <button className="userSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <SideBar />
    </div>
  );
}
export default UserProfile