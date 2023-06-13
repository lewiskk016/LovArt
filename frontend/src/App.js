import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./MainPage/MainPage";

import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import Posts from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import PostCompose from "./components/Posts/PostCompose";
import PostUpdate from "./components/Posts/PostUpdate";

import { getCurrentUser } from "./store/session";
import UserIndex from "./components/UserIndex/UserIndex";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/Posts" component={Posts} />
          <ProtectedRoute path="/profile/:username" component={UserIndex} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/Posts/new" component={PostCompose} />
        </Switch>
      </>
    )
  );
}

export default App