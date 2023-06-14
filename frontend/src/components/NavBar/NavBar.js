import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";
// import image from "./lovart-logo.png";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <div className="all-posts">
            <Link className="side-nav-text" to={"/posts"}>
              <i className="fa-solid fa-glasses"></i>All posts
            </Link>
          </div>
          <div className="profile-page">
            {" "}
            <Link className="side-nav-text" to={"/profile"}>
              <i className="fa-solid fa-palette"></i>Profile
            </Link>
          </div>
          <div className="write-post">
            {" "}
            <Link className="side-nav-text" to={"/posts/new"}>
              <i className="fa-solid fa-paintbrush"></i>Share a post
            </Link>
          </div>
          <div className="logout-btn">
            {" "}
            <button className="side-nav-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          {/* <div className="navbar">
            <div className="logo">
              <Link to={loggedIn ? "/posts" : "/"}> */}
                {/* {" "} */}
                {/* <img src={image} alt="logo" /> */}
              {/* </Link>
              <div className="logo-overlay"></div>
            </div> */}
            {/* <div className="signup">
              <div className="nav-login">
                <Link className="login" to={"/"}>
                  Login
                </Link>
              </div>
              <div className="nav-register">
                <Link className="register" to={"/signup"}>
                  Register
                </Link>
              </div>
            </div> */}
          {/* </div> */}

          {/* // <div className="links-auth"></div> */}
        </>
      );
    }
  };

  return <>{getLinks()}</>;
}

export default NavBar;
