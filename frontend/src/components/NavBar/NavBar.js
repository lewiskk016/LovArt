import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import image from "./lovart-logo.png"

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/posts'}>All posts</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/posts/new'}>Write a post</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <>
           <div className='navbar'>
           <div className='logo'>
            <Link to="/"> <img src={image} alt="logo" /></Link>
            <div className='logo-overlay'></div>
           </div>
           <div className="signup">
           <div className='nav-login'>
            <Link className="login" to={'/login'}>Login</Link></div>
           <div className='nav-register'>
           <Link className="register" to={'/signup'}>Register</Link>
           </div>
           </div>
        </div>
           
        <div className="links-auth">
         
          
         </div>
         </>
      );
    }
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;
