import "./PostBox.css"

function PostBox ({ post: { text, author, imageUrls }}) {
  const { username, profileImageUrl } = author;
  const images = imageUrls?.map((url, index) => {
    return <img className="post-image" key ={url} src={url} alt={`postImage${index}`} />
  });

  return (
    <div className="post">
      <h3>
        {profileImageUrl ?
            <img className="profile-image" src={profileImageUrl} alt="profile"/> :
            undefined}
        {username}
        </h3>
      <p>{text}</p>
      {images}
    </div>
  );
}

export default PostBox;
