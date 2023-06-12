import "./PostBox.css"
import image from "./profile.png"

function PostBox ({ post: { text, author, imageUrls }}) {
  const { username, profileImageUrl } = author;
  const images = imageUrls?.map((url, index) => {
    return <img className="post-image" key ={url} src={url} alt={`postImage${index}`} />
  });

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
  <div className="user-username"><h3>{profileImageUrl ?
            <img className="profile-image" src={profileImageUrl} alt="profile"/> :
            undefined}
            {username}</h3></div>

</div>
</div>
<div className="post-description">
<p>{text}</p>
{images}
</div>
    </div>
  );
}

export default PostBox;

