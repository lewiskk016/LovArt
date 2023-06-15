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
              setShowComments(!showComments);
            }}
          >
            Comments
          </button>
        </div>
      </div>
    </div>

<div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
  <span className="new-class"></span>
  {isImageClicked && (
    <PostBox
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
  )}
</div>
  </>
);
}

export default ProfileIndexItem;




















// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUserPosts } from '../../store/posts';
// import './ProfileIndexItem.css';
// import Modal from '../Modal/Modal';
// import Comments from '../Comments/Comments';
// import { fetchPosts } from '../../store/posts';
// import PostBox from '../Posts/PostBox';

// function ProfileIndexItem({
//   post: {
//     text,
//     author: { username, profileImageUrl, _id: authorId },
//     imageUrls,
//     _id: postId,
//     comments,
//   },
// }) {
//   const currentUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const likes = useSelector((state) => state.likes);

//   const [openModal, setOpenModal] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isImageClicked, setIsImageClicked] = useState(false);
//   const [isPostBoxVisible, setIsPostBoxVisible] = useState(false);

//   const images = imageUrls?.map((url, index) => {
//     return (
//       <img
//         className="listing-index-item-image"
//         key={url}
//         src={url}
//         alt={`postImage${index}`}
//       />
//     );
//   });

//   const handleImageClick = () => {
//     setIsImageClicked(true);
//   };

//   const closeModal = () => {
//     setIsImageClicked(false);
//   };

//   return (
//     <>
//       <div
//         className={`image-box ${isImageClicked ? 'expanded' : ''}`}
//         onClick={handleImageClick}
//       >
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

//       {isImageClicked && (
//         <Modal closeModal={closeModal}>
//           <PostBox post={post} />
//         </Modal>
//       )}

//       {/* ... */}
//     </>
//   );
// }

// export default ProfileIndexItem;










































  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

//   return (
//     <>
//           {/* <div className={`image-box ${isImageClicked ? 'expanded' : ''}`} onClick={handleClickImage}> */}

//     <div className="comment-box">
//     {isImageClicked && <Comments postId={postId} />}
//     {/* {isImageClicked && <PostBox postId={postId} />} */}
//     {/* {isPostBoxVisible && <PostBox post={postId} />} */}


//     </div>
//       <div
//         className={`image-box ${isImageClicked ? "expanded" : ""}`}
//         ref={imageRef}
//         onClick={handleClickImage}
//       >
//         {/* <div className={`image-box ${isImageClicked ? "expanded" : ""}`} onClick={handleClickImage}> */}


//         <img src={images} alt="" />
//         <div className="overlay">
//           <div className="details">
//             {/* <h3 className="title">
//               <a href="">Your Title</a>
//             </h3> */}

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
//     </>
//   );



// }

// export default ProfileBox;












// import { useDispatch, useSelector } from "react-redux";
// import { deleteUserPosts } from "../../store/posts"
// import "./ProfileIndexItem.css"
// import { useState } from "react";
// import Modal from "../Modal/Modal";
// import Comments from "../Comments/Comments";
// import { useEffect } from "react";
// import { useRef } from "react";


// function ProfileBox ({ post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId }}) {
//     const currentUser = useSelector((state) => state.session.user);
//     const dispatch = useDispatch()
//     const posts = useSelector((state) => state.posts);
//     const imageRef = useRef(null);

//     const [openModal, setOpenModal] = useState(false)
//     const [showComments, setShowComments] = useState(false);
//     const [isImageClicked, setIsImageClicked] = useState(false);

//     const images = imageUrls?.map((url, index) => {
//       return url
//       // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
//     });
//     const numCols = posts.length
//   console.log("hello",images)
//     const handleDelete = () => {
//       dispatch(deleteUserPosts(postId));
//     }

//     const handleClickImage = () => {
//       setIsImageClicked(!isImageClicked);
//     };

//     const handleClickOutside = (event) => {
//       if (imageRef.current && !imageRef.current.contains(event.target)) {
//         setIsImageClicked(false);
//       }
//     };

//     useEffect(() => {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, []);

//     return (
//       <>
//         {/* <div className="image-box"> */}
//         <div className={`image-box ${isImageClicked ? "expanded" : ""}`} onClick={handleClickImage}>
//           <img src={images} alt="" />
//           <div className="overlay">
//             <div className="details">
//               <h3 className="title">
//                 <a href="">Your Title</a>
//               </h3>
//               {isImageClicked && <Comments postId={postId} />}
//             <button
//               href="#"
//               className="openModalBtn"
//               onClick={() => {
//                 setShowComments(!showComments);
//               }}
//               // {showComments && <Comments postId={postId} />}
//               // <button
//               //   href="#"
//               //   className="openModalBtn"
//               //   onClick={() => {
//               //     setShowComments(!showComments);
//               //   }}
//               >
//                 Comments
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* {showComments && <Comments postId={postId} />} */}
//       </>
//     );


//     };


// export default ProfileBox
