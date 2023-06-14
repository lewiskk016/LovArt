import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, clearPostErrors, fetchPosts } from "../../store/posts";
import PostBox from "../Posts/PostBox";
import ProfileBox from "./ProfileBox";
import { useParams } from "react-router-dom";

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
        <h2>All of {authorId || currentUser.username}'s Posts</h2>
        {userPosts.map((post) => (
          <div className="image-grid" key={post._id}>
            <PostBox post={post} />
          </div>
        ))}
      </>
    );
  }
}

export default Profile;
