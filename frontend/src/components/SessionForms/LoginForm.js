import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { login, clearSessionErrors } from "../../store/session";
import image from "../SessionForms/monet.jpeg";

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
            <form className="session-form" onSubmit={handleSubmit}>
              <h2>Log In Form</h2>
              <p>
                Don't you have an account?
                <Link className="link-sign" to="/signup">
                  Sign Up
                </Link>
              </p>
              <div className="errors">{errors?.email}</div>
              <label>
                Email
                <input
                required
                  type="text"
                  value={email}
                  onChange={update("email")}
                  placeholder="Email"
                />
              </label>
              <div className="errors">{errors?.password}</div>
              <label>
                Password
                <input
                required
                  type="password"
                  value={password}
                  onChange={update("password")}
                  placeholder="Password"
                />
              </label>
              <input
                type="submit"
                value="Log In"
                disabled={!email || !password}
              />
            </form>
          </div>
        </div>
        </div>
        <div className="login-page-image">
          <div className="page-img">
            <img src={image} alt="monet painting" />
            <div class="text-overlay">
              <p>Art is the only way to run away without leaving home. </p>
              <h1 className="right-bottom">Twyla Tharp</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
