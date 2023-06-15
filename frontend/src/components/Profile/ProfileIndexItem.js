import { useDispatch, useSelector } from "react-redux";
import { deleteUserPosts } from "../../store/posts"
import "./ProfileIndexItem.css"
import { useState } from "react";
import Modal from "../Modal/Modal";


function ProfileBox ({ post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId }}) {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts);

    const [openModal, setOpenModal] = useState(false)

    const images = imageUrls?.map((url, index) => {
      return url
      // return <img className="listing-index-item-image" key ={url} src={url} alt={`postImage${index}`} />
    });
    const numCols = posts.length
  console.log("hello",images)
    const handleDelete = () => {
      dispatch(deleteUserPosts(postId));
    }

    return (
    // <div className="image-gallery">
    <>
      <div className="image-box">
        <img src={images} alt="" />
        <div className="overlay">
          <div className="details"><h3 className="title">
            <a href="">Your Title</a></h3>
            {/* <span className="category"> */}
              <button href="#"
              className="openModalBtn"
              onClick={()=>{
                setOpenModal(true)
              }}
              >Comments</button>
              {/* </span> */}
              </div>
        </div>
      </div>
              {openModal && <Modal closeModal={setOpenModal}></Modal>}
             </>
    // </div>
      );
    };


export default ProfileBox