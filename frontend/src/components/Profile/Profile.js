import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPosts,
  clearPostErrors,
  fetchPosts
} from "../../store/posts";
import PostBox from "../Posts/PostBox";
import ProfileIndexItem from "./ProfileIndexItem";
import { useParams } from "react-router-dom";
import "./ProfileIndexItem.css";
import "./Profile.css";
import art from "../Posts/lovart-logo-white.png";
import Comments from "../Comments/Comments";
import FullPageModal from "./Modal";

function Profile() {
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts.all));

  const userPosts = useSelector((state) =>
    authorId
      ? Object.values(state.posts.user).filter(
          (post) => post.author._id === authorId
        )
      : Object.values(state.posts.user)
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const { username, profileImageUrl } =
  authorId && posts.find((post) => post.author._id === authorId)?.author
    ? posts.find((post) => post.author._id === authorId)?.author
    : currentUser;

  // Needs fetchPosts so can have all posts in state on refresh and no error
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

  const handleOpenModal = (postId) => {
    const post = userPosts.find((post) => post._id === postId);
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  // if (userPosts.length === 0) {
  //   return (
  //     <div className="loading-container">
  //       <img src={art} className="loading-art" alt="Loading" />
  //     </div>
  //   );
  // }
    return (
      <>
        <div className="profile-page-body">
          <div className="profile-info-bar">
            <div className="container-for-profile">
              <div className="image-username-container">
                <div className="profile-image-box">
                  <img
                    src={profileImageUrl}
                    alt=""
                    className="profile-image"
                  />
                </div>
                <div className="profile-username-container">
                  <h1 className="profile-username">{username}</h1>
                </div>
              </div>
              <div className="member-since">
                <div className="how-many-posts">
                  <p className="number-of-posts">{userPosts.length} Posts</p>
                </div>
              </div>
            </div>
            <div className="profile-info-box">
              <p className="user-bio">
                Now that the component is done statically, it was time to move
                on to making it do what it is supposed to do. There are two ways
                that I could’ve made this component — have a Next and Prev
                button on either side of the carousel block to manually change
                the item, or make it to keep changing tiles on a loop. I went
                for the second option. To deal with currentIndex, I made a
                function what would run at an interval of 3 seconds (which is
                what will determine how long is a carousel item visible before
                it moves on to the next one) and called it inside useEffect().
              </p>
            </div>
          </div>
          <hr />
          <div className="image-gallery">
  {userPosts.map((post) => {
    if (!post) {
      return null; // Skip rendering if post is undefined
    }
    return (
      <ProfileIndexItem
        key={post._id}
        post={post}
        onOpenModal={handleOpenModal}
      />
    );
  })}
</div>
        </div>

        {selectedPost && (
  <FullPageModal isOpen={true} onClose={handleCloseModal}>
    <div className="modal-content">
      <PostBox post={selectedPost} onClose={handleCloseModal} showComments />
    </div>
  </FullPageModal>
)}
      </>
    );
  }

export default Profile;
