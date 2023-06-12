import "./PostBox.css"
import image from "./profile.png"

function PostBox ({ post: { text, author }}) {
  const { username } = author;
  return (
    <div className="post-con">
<div className="post-image">
  <div className="artist">
    <h1>ART</h1>
  </div>
  <div className="artist-img"></div>
</div>
<div className="post-det">
<div className="post-username">
  <div className="username"></div>
  <div className="artist-name"><h1>ARTIST</h1></div>
</div>
<div className="post-like">
  <div className="user-image">
    <img src={image} alt="" />
  </div>
  <div className="user-username"><h3>{username}</h3></div>

</div>
</div>
<div className="post-description">
<p>{text}</p>
</div>
    </div>
  );
}

export default PostBox;

