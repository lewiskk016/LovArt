import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import Comments from "../Comments/Comments";
import PostBox from "../Posts/PostBox";
import "./ProfileIndexItem.css";

function ProfileIndexItem({ post, onOpenModal }) {
  const [showModal, setShowModal] = useState(false);
  const { text, author, imageUrls, _id } = post;
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    onOpenModal(_id); // Call the onOpenModal function from the prop
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="image-box">
        <img src={imageUrls} alt="" />
        <div className="overlay">
          <div className="details">
            <button className="openModalBtn" onClick={handleOpenModal}>
              View Post
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="modal-content" ref={modalRef}>
            {/* Add modal content */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileIndexItem;
