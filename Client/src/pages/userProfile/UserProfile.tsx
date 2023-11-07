import axios from "axios";
import "./userprofile.css";
//import SideBar from "../../components/sidebar/SideBar";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import config from "../../../config";
const token = localStorage.getItem("token");

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Get the token from local storage

    if (token) {
      fetch(`http://localhost:3000/api/users/verifyToken`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserData(data); // Store user data in state
          authContext?.updateUserContext(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (token) {
      // Make a PUT or PATCH request to update user data
      fetch(`${config.SERVER_URL}/api/users/update`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          console.log(updatedData); // Updated user data
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Make an HTTP DELETE request to the server's delete endpoint

      const response = await axios.delete(
        `${config.SERVER_URL}/api/users/delete/${userData.email}`
      );

      if (response.status === 200) {
        console.log("User deleted successfully");
        localStorage.removeItem("token");
        setUserData({
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  {
    /*const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const selectedFile = new FormData(); // Create a new FormData object

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput && fileInput.files) {
      selectedFile.append("file", fileInput.files[0]);

      try {
        const response = await axios.post("end_point", selectedFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log("File uploaded successfully.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };*/
  }

  // Define the required props for SideBar
  /*const sidebarProps: SidebarProps = {
    posts: [], // Provide the posts data here
    setSelectedCategory: (category) => {
      /* Implement your logic here 
    },
    selectedCategory: "defaultCategory", // Provide the selected category here
  };*/

  return (
    <div className="user">
      <div className="userWrapper">
        <div className="userTitle">
          <span className="userTitleUpdate">Update Your Account</span>
          <span className="userTitleDelete" onClick={handleDeleteUser}>
            Delete Account
          </span>
        </div>

        {userData && (
          <form className="userForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="userPP">
              <img
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <label htmlFor="fileInput">
                <FontAwesomeIcon className="writeIcon" icon={faPlus} />
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="userPPInput"
              />
            </div>
            <label>First Name</label>
            <input
              type="text"
              placeholder={userData.firstName}
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <label>Last Name</label>
            <input
              type="text"
              placeholder={userData.lastName}
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={userData.email}
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder={userData.password}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <button className="userSubmitButton" type="submit">
              Update
            </button>
          </form>
        )}
      </div>
      {/*<SideBar />*/}
    </div>
  );
};
export default UserProfile;
