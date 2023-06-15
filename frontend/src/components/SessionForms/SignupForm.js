import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";
import monet from "../SessionForms/monet.jpeg";
import "./SignupForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Carousel from "../Carousel/Carousel";
import image1 from "../Posts/lovart-logo-white.png"

function SignupForm() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      image,
      password,
    };

    dispatch(signup(user));
  };
  const updateFile = (e) => setImage(e.target.files[0]);

  return (
    <>
      <div className="signup-page">
        <div className="sign-back-line">
          <div className="sign-form-container">
            <div className="signup-form">
              <form
                className="session-form form-signup"
                onSubmit={handleSubmit}
              >
                {/* <h2 className="sign-header">Sign Up Form</h2> */}
                <img src={image1} className="carousel-logo-img-sign" alt="logo" />
                <label>
                  {/* <span>Email</span> */}
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={update("email")}
                    placeholder="Email"
                    style={{ borderColor: errors?.email ? 'red' : '#ddd' }}
                  />
                </label>
                <div className="errors">{errors?.email}</div>

                <label>
                  {/* <span>Username</span> */}
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={update("username")}
                    placeholder="Username"
                    style={{ borderColor: errors?.username ? 'red' : '#ddd' }}
                  />
                </label>
                <div className="errors">{errors?.username}</div>

                <label>
                  {/* <span>Password</span> */}
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={update("password")}
                    placeholder="Password"
                    style={{ borderColor: errors?.password ? 'red' : '#ddd' }}

                  />
                </label>
                <div className="errors">{errors?.password}</div>

                <label>
                  {/* <span>Confirm Password</span> */}
                  <input
                    type="password"
                    required
                    value={password2}
                    onChange={update("password2")}
                    placeholder="Confirm Password"
                    style={{ borderColor: errors?.password ? 'red' : '#ddd' }}
                  />
                </label>
                <div className="errors">
                  {password !== password2 &&
                    "Confirm Password field must match"}
                </div>
                <label>
                  Profile Image
                  <input
                    className="signup-page-file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={updateFile}
                  />
                </label>

                <input
                  className="signup-page-submit-btn"
                  type="submit"
                  value="Sign Up"
                  disabled={
                    !email || !username || !password || password !== password2
                  }
                />
                <div className="login-link-container">
                  <span>Already have an account? </span>
                  <Link to="/" className="link-sign">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="signup-page-image">
          <div className="page-img">
            <img src={monet} alt="monet painting" />
            <div className="text-overlay">
              <span>
                <Carousel></Carousel>
              </span>{" "}
              <h1 className="bottom-right"></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
