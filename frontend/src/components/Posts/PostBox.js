import "./PostBox.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function PostBox({ post: { text, author, imageUrls } }){


  const { username, profileImageUrl } = author;
  
  const images = imageUrls?.map((url, index) => {  
    return (
      <img
        className="post-image"
        key={url}
        src={url}
        alt={`postImage${index}`}
      />
    );
  });

  return (
    <div className="post-con">
      <div className="post-image">
        {/* <div className="artist">
          <h1>ART</h1>
        </div> */}
        <div className="artist-img">
         {images} 
        </div>
      </div>
      <div className="post-det">
        <div className="post-username">
          <div className="username"></div>
        
        </div>
        <div className="post-like">
          <div className="user-image">
            {profileImageUrl ? (
              <img
                className="profile-image"
                src={profileImageUrl}
                alt="profile"
              />
            ) : undefined}
          </div>
          <div className="user-username">
            <Link to={`/profile/${username}`}>{username}</Link>
            {/* <h3>{username}</h3> */}
          </div>
          <div className="artist-name">
            <h1>ARTIST</h1>
          </div>
        </div>
      </div>
      <div className="post-description">
        <p>{text}</p>
       
      </div>
    </div>
  );
}

export default PostBox;
