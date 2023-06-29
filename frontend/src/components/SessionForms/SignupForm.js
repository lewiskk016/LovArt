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
  const [imageError, setImageError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;
    let setErrorState;
  
    switch (field) {
      case "email":
        setState = setEmail;
        setErrorState = setEmailError;
        break;
      case "username":
        setState = setUsername;
        setErrorState = setUsernameError;
        break;
      case "password":
        setState = setPassword;
        setErrorState = setPasswordError;
        break;
      case "password2":
        setState = setPassword2;
        setErrorState = setPassword2Error;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }
  
    return (e) => {
      setState(e.currentTarget.value);
      setErrorState("");
      dispatch(clearSessionErrors());
    };
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let validationError = false;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^.{5,30}$/;
    const passwordRegex = /^.{6,30}$/;
  
    if (!email) {
      setEmailError("Email cannot be blank");
      validationError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email is invalid");
      validationError = true;
    } else if (errors?.email) {
      setEmailError(errors.email);
      validationError = true;
    }
  
    if (!username) {
      setUsernameError("Username cannot be blank");
      validationError = true;
    } else if (!usernameRegex.test(username)) {
      setUsernameError("Username must be between 5 and 30 characters");
      validationError = true;
    } else if (errors?.username) {
      setUsernameError(errors.username);
      validationError = true;
    }
  
    if (!password) {
      setPasswordError("Password cannot be blank");
      validationError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password must be between 6 and 30 characters");
      validationError = true;
    } else if (errors?.password) {
      setPasswordError(errors.password);
      validationError = true;
    }
  
    if (!password2) {
      setPassword2Error("Confirm password cannot be blank");
      validationError = true;
    } else if (errors?.password) {
      setPassword2Error(errors.password);
      validationError = true;
    } else if (password !== password2) {
      setPassword2Error("Confirm Password field must match");
      validationError = true;
    }
  
    if (!image) {
      setImageError(errors?.image || "Profile image is required");
      validationError = true;
    }
  
    if (!validationError) {
      const user = {
        email,
        username,
        image,
        password,
      };
  
      dispatch(signup(user));
    }
  };
  
  
  
  
  const updateFile = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      setImageError("Profile image is required");
    } else {
      setImage(selectedImage);
      setImageError("");
      dispatch(clearSessionErrors());
    }
  };
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
                  <input
                    type="text"
                    value={email}
                    onChange={update("email")}
                    placeholder="Email"
                    style={{ borderColor: errors?.email || emailError ? 'red' : '#ddd' }}
                  />
                  <div className="errors">{errors?.email || emailError}</div>
                </label>

                <label>
                  <input
                    type="text"
                    value={username}
                    onChange={update("username")}
                    placeholder="Username"
                    style={{ borderColor: errors?.username || usernameError ? 'red' : '#ddd' }}
                  />
                  <div className="errors">{errors?.username || usernameError}</div>
                </label>

                <label>
                  <input
                    type="password"
                    value={password}
                    onChange={update("password")}
                    placeholder="Password"
                    style={{ borderColor: errors?.password || passwordError ? 'red' : '#ddd' }}
                  />
                  <div className="errors">{errors?.password || passwordError}</div>
                </label>

                <label>
                  <input
                    type="password"
                    value={password2}
                    onChange={update("password2")}
                    placeholder="Confirm Password"
                    style={{ borderColor: errors?.password || password2Error ? 'red' : '#ddd' }}
                  />
                  <div className="errors">
                    {password !== password2 && "Confirm Password field must match"}
                    {password2Error}
                  </div>
                </label>
                <label>
                  Profile Image
                  <input
                    className="signup-page-file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={updateFile}
                  />
                  <div className="errors">{imageError}</div>
                </label>

                <input
                  className="signup-page-submit-btn"
                  type="submit"
                  value="Sign Up"
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
