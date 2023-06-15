// import React from "react";
// import "./Modal.css";

// const Modal = ({ children, onClose }) => {
//   return (
//     <div className="modal-overlay">
//          <div className={`comment-box ${isImageClicked ? 'active' : ''}`}>
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
//       <div className="modal-content">
//         {children}
//         <button className="modal-close" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
