import { useDispatch, useSelector } from "react-redux";
import { deleteUserPosts } from "../../store/posts";
import "./ProfileIndexItem.css";
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import Comments from "../Comments/Comments";
import { fetchPosts } from "../../store/posts";
import PostBox from "../Posts/PostBox";


















function ProfileIndexItem({
  post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId, comments }
}) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const imageRef = useRef(null);
  const likes = useSelector((state) => state.likes);
  const post = useSelector((state) => state.posts.all.find((post) => post._id === postId));

  const [openModal, setOpenModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isPostBoxVisible, setIsPostBoxVisible] = useState(false);


  const images = imageUrls?.map((url, index) => {
    return url;
    // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
  });
  const numCols = posts.length;

  const handleDelete = () => {
    dispatch(deleteUserPosts(postId));
  };

  const handleClickImage = () => {
    setIsImageClicked(!isImageClicked);
  };

  const handleClickOutside = (event) => {
    if (imageRef.current && !imageRef.current.contains(event.target)) {
      setIsImageClicked(false);
    }
  };




return (
  <>

    <div className={`image-box ${isImageClicked ? 'expanded' : ''}`} onClick={handleClickImage}>


      <img src={images} alt="" />
      <div className="overlay">
        <div className="details">
          <button
            href="#"
            className="openModalBtn"
            onClick={() => {
              // setShowComments(!showComments);
            }}
          >
            Comments
          </button>
        </div>
      </div>
    </div>

{/* <div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
  <span className="new-class"></span>
  {isImageClicked && (
  <Comments postId={postId} /> )} */}

<div className={`comment-box ${isImageClicked ? 'active' : ''} ${isImageClicked ? 'clicked' : ''}`}>
      <span className="new-class"></span>
      {isImageClicked &&
      <Comments postId={postId} />}



    {/* <PostBox
      post={{
        text,
        author: {
          username,
          profileImageUrl,
          _id: authorId
        },
        imageUrls,
        _id: postId,
        likes
      }}
    />


  } */}
</div>
  </>
);
}

export default ProfileIndexItem;












// function ProfileIndexItem({
//   post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId, comments }
// }) {
//   const currentUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const imageRef = useRef(null);
//   const likes = useSelector((state) => state.likes);
//   const post = useSelector((state) => state.posts.all.find((post) => post._id === postId));

//   const [openModal, setOpenModal] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isImageClicked, setIsImageClicked] = useState(false);
//   const [isPostBoxVisible, setIsPostBoxVisible] = useState(false);


//   const images = imageUrls?.map((url, index) => {
//     return url;
//     // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
//   });
//   const numCols = posts.length;

//   const handleDelete = () => {
//     dispatch(deleteUserPosts(postId));
//   };

//   const handleClickImage = () => {
//     setIsImageClicked(!isImageClicked);
//   };

//   const handleClickOutside = (event) => {
//     if (imageRef.current && !imageRef.current.contains(event.target)) {
//       setIsImageClicked(false);
//     }
//   };

//   return (
//     <>
//       <div className={`image-box ${isImageClicked ? 'expanded' : ''}`} onClick={handleClickImage}>
//         <img src={images} alt="" />
//         <div className="overlay">
//           <div className="details">
//             <button
//               href="#"
//               className="openModalBtn"
//               onClick={() => {
//                 setShowComments(!showComments);
//               }}
//             >
//               Comments
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
//         <span className="new-class"></span>
//         {isImageClicked && (
//           <Modal onClose={() => setIsImageClicked(false)}>
//             <PostBox
//               post={{
//                 text,
//                 author: {
//                   username,
//                   profileImageUrl,
//                   _id: authorId
//                 },
//                 imageUrls,
//                 _id: postId,
//                 likes
//               }}
//             />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// }

// export default ProfileIndexItem;



















// import { useDispatch, useSelector } from "react-redux";
// import { deleteUserPosts } from "../../store/posts";
// import "./ProfileIndexItem.css";
// import { useState, useEffect, useRef } from "react";
// import Modal from "./Modal";
// import Comments from "../Comments/Comments";
// import { fetchPosts } from "../../store/posts";
// import PostBox from "../Posts/PostBox";

// function ProfileIndexItem({
//   post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId, comments }
// }) {
//   const currentUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const imageRef = useRef(null);
//   const likes = useSelector((state) => state.likes);
//   const post = useSelector((state) => state.posts.all.find((post) => post._id === postId));

//   const [openModal, setOpenModal] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isImageClicked, setIsImageClicked] = useState(false);
//   const [isPostBoxVisible, setIsPostBoxVisible] = useState(false);


//   const images = imageUrls?.map((url, index) => {
//     return url;
//     // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
//   });
//   const numCols = posts.length;

//   const handleDelete = () => {
//     dispatch(deleteUserPosts(postId));
//   };

//   const handleClickImage = () => {
//     setIsImageClicked(!isImageClicked);
//   };

//   const handleClickOutside = (event) => {
//     if (imageRef.current && !imageRef.current.contains(event.target)) {
//       setIsImageClicked(false);
//     }
//   };

//   return (
//     <>
//       <div className={`image-box ${isImageClicked ? 'expanded' : ''}`} onClick={handleClickImage}>
//         <img src={images} alt="" />
//         <div className="overlay">
//           <div className="details">
//             <button
//               href="#"
//               className="openModalBtn"
//               onClick={() => {
//                 setShowComments(!showComments);
//               }}
//             >
//               Comments
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
//         <span className="new-class"></span>
//         {isImageClicked && (
//           <Modal onClose={() => setIsImageClicked(false)}>
//             <PostBox
//               post={{
//                 text,
//                 author: {
//                   username,
//                   profileImageUrl,
//                   _id: authorId
//                 },
//                 imageUrls,
//                 _id: postId,
//                 likes
//               }}
//             />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// }

// export default ProfileIndexItem;




































































// function ProfileIndexItem({
//   post: {
//     text,
//     author: { username, profileImageUrl, _id: authorId },
//     imageUrls,
//     _id: postId,
//     comments,
//   },
// }) {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);

//   const handleDelete = () => {
//     dispatch(deleteUserPosts(postId));
//   };

//   return (
//     <>
//       <div className="image-box">
//         <img src={imageUrls} alt="" />
//         <div className="overlay">
//           <div className="details">
//             <button
//               className="openModalBtn"
//               onClick={() => setShowModal(true)}
//             >
//               Comments
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <PostBox
//             post={{
//               text,
//               author: { username, profileImageUrl, _id: authorId },
//               imageUrls,
//               _id: postId,
//             }}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default ProfileIndexItem;













































// import { useDispatch, useSelector } from "react-redux";
// import { deleteUserPosts } from "../../store/posts";
// import "./ProfileIndexItem.css";
// import { useState, useEffect, useRef } from "react";
// import Modal from "../Modal/Modal";
// import Comments from "../Comments/Comments";
// import { fetchPosts } from "../../store/posts";
// import PostBox from "../Posts/PostBox";

// function ProfileIndexItem({
//   post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId, comments }
// }) {
//   const currentUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const imageRef = useRef(null);
//   const likes = useSelector((state) => state.likes);
//   const post = useSelector((state) => state.posts.all.find((post) => post._id === postId));

//   const [openModal, setOpenModal] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isImageClicked, setIsImageClicked] = useState(false);
//   const [isPostBoxVisible, setIsPostBoxVisible] = useState(false);


//   const images = imageUrls?.map((url, index) => {
//     return url;
//     // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
//   });
//   const numCols = posts.length;

//   const handleDelete = () => {
//     dispatch(deleteUserPosts(postId));
//   };

//   const handleClickImage = () => {
//     setIsImageClicked(!isImageClicked);
//   };

//   const handleClickOutside = (event) => {
//     if (imageRef.current && !imageRef.current.contains(event.target)) {
//       setIsImageClicked(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className={`image-box ${isImageClicked ? 'expanded' : ''}`} onClick={handleClickImage}>
//         <img src={images} alt="" ref={imageRef} />
//         <div className="overlay">
//           <div className="details">
//             <button
//               href="#"
//               className="openModalBtn"
//               onClick={() => {
//                 setShowComments(!showComments);
//               }}
//             >
//               Comments
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
//         <span className="new-class"></span>
//         {isImageClicked && (
//           <PostBox
//             post={{
//               text,
//               author: {
//                 username,
//                 profileImageUrl,
//                 _id: authorId
//               },
//               imageUrls,
//               _id: postId,
//               likes
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default ProfileIndexItem;
