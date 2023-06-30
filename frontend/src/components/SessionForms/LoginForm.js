import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { login, clearSessionErrors } from "../../store/session";
import image from "../SessionForms/monet.jpeg";
import Carousel from "../Carousel/Carousel";
import image1 from "../Posts/lovart-logo-white.png"

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className="login-page">
        <div className="back-line">
          <div className="login-form-container">
            <div className="login-form">
              <form className="session-form form-login" onSubmit={handleSubmit}>
                {/* <h2>Log In Form</h2> */}
                <img src={image1} className="carousel-logo-img" alt="logo" />

                <p>
                  Don't you have an account?  
                  <Link className="link-sign" to="/signup">
                    Sign Up
                  </Link>
                </p>

                <label>
                  <input
                    required
                    className="input"
                    type="text"
                    value={email}
                    onChange={update("email")}
                    placeholder="Email"
                    style={{ borderColor: errors?.email ? 'red' : '#ddd' }}
                  />
                </label>
                <div className="errors">{errors?.email}</div>

                <label>
                  <input
                    required
                    className="input"
                    type="password"
                    value={password}
                    onChange={update("password")}
                    placeholder="Password"
                    style={{ borderColor: errors?.password ? 'red' : '#ddd' }}
                  />
                </label>
                <div className="errors">{errors?.password}</div>
                <input
                  className="submit-style-this"
                  type="submit"
                  value="Log In"
                  disabled={!email || !password}
                />
              </form>
              <div className="demo-user-container">
                {/* <label className="Demo-User"></label> */}
                <form className="demo-user-form" onSubmit={handleSubmit}>
                  <button
                    className="demo"
                    type="submit"
                    onClick={() => {
                      setEmail("demo-user@appacademy.io");
                      setPassword("starwars");
                    }}
                  >
                    Demo User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="login-page-image">
          <div className="page-img">
            <img src={image} alt="monet painting" />
            <div class="text-overlay">

              <p>
                <Carousel></Carousel>
              </p>

              <h1 className="right-bottom"></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
