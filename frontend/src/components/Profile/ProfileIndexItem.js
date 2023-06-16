import { useState } from "react";
import Modal from "../Modal/Modal";
import Comments from "../Comments/Comments";
import PostBox from "../Posts/PostBox";
import "./ProfileIndexItem.css";

function ProfileIndexItem({ post, onOpenModal }) {
  const [showModal, setShowModal] = useState(false);
  const { text, author, imageUrls, _id } = post;

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
              Comments
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="modal-content">
            {/* Add modal content */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileIndexItem;
