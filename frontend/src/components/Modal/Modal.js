// import React from "react";
// import './Modal.css'

// const Modal = ({closeModal}) => {
//     return (
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div className="titleCloseBtn">
//                 <button onClick={()=> closeModal(false)}>X</button>
//                 </div>
//                 <div className="likes">
//                     <p>Likes</p>
//                 </div>
//                 <div className="comments">
//                     <p>Comments</p>
//                     </div>
//             </div>
//         </div>
//     )
// }
// export default Modal

import React from 'react';
import './Modal.css';


const FullPageModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="details">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default FullPageModal;

