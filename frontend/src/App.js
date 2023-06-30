import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, useLocation } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import Posts from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import PostCompose from "./components/Posts/PostCompose";
import ProfileIndexItem from "./components/Profile/ProfileIndexItem";
import Search from "./components/Search";
import Comments from "./components/Comments/Comments";
import PostUpdate from "./components/Posts/PostUpdate";
import { getCurrentUser } from "./store/session";
import UserIndex from "./components/UserIndex/UserIndex";
import AboutUs from "./components/AboutUs/AboutUs";

import backgroundImage from "./components/Profile/joe-woods-4Zaq5xY5M_c-unsplash.jpg";
import "./index.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  const shouldShowBackground = !["/", "/signup"].includes(location.pathname);

  return (
    loaded && (
      <div className={shouldShowBackground ? "app-background" : "app"}>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/Posts" component={Posts} />
          <ProtectedRoute path="/profile/:authorId" component={Profile} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/Posts/new" component={PostCompose} />
          <ProtectedRoute exact path="/searches/:query" component={Search} />
          <ProtectedRoute exact path="/AboutUs" component={AboutUs} />
        </Switch>
      </div>
    )
  );
}

export default App;