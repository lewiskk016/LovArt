import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, clearPostErrors, fetchPosts } from "../../store/posts";
import PostBox from "../Posts/PostBox";
import ProfileIndexItem from "./ProfileIndexItem";
import { useParams } from "react-router-dom";
import "./ProfileIndexItem.css"
import "./Profile.css"

function Profile() {
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const userPosts = useSelector((state) =>
    authorId
      ? Object.values(state.posts.user).filter((post) => post.author._id === authorId)
      : Object.values(state.posts.user)
  );
  //Needs fetchPosts so can have all posts in state on refresh and no error
  useEffect(() => {
    dispatch(fetchPosts())
      .then(() => {
        const userId = authorId ? authorId : currentUser._id;
        dispatch(fetchUserPosts(userId));
      })
      .catch((error) => {
        // Handle error
      });
    return () => dispatch(clearPostErrors());
  }, [authorId, currentUser._id, dispatch]);


  if (userPosts.length === 0) {
    return <div>{authorId || currentUser.username} has no Posts</div>;
  } else {
    return (
      <>
        {/* <h2>All of {authorId || currentUser.username}'s Posts</h2> */}
        <div className="profile-page-body">
          <div className="profile-info-bar">
            <div className="profile-image-box">
              <img src={currentUser.profileImageUrl} alt="" />
            </div>
            <div className="profile-info-box">
              <h1 className="profile-username">{currentUser.username}</h1>
              <p className="user-bio">Now that the component is done statically, it was time to move on to making it do what it is supposed to do. There are two ways that I could’ve made this component — have a Next and Prev button on either side of the carousel block to manually change the item, or make it to keep changing tiles on a loop. I went for the second option.To deal with currentIndex, I made a function what would run at an interval of 3 seconds (which is what will determine how long is a carousel item visible before it moves on to the next one) and called it inside useEffect().</p>
              
            </div>
          </div>
          <hr></hr>
          <div className="how-many-posts"><p className="number-of-posts">{userPosts.length} Posts</p></div>
       <div className="image-gallery">
        {userPosts.map((post) => (
          // <div className="image-grid" key={post._id}>
            <ProfileIndexItem post={post} />
          // </div>
        ))}
        </div>
        </div>
      </>
    );
  }
}

export default Profile;
