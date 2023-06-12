import "./PostBox.css"

function PostBox ({ post: { text, author }}) {
  const { username, profileImageUrl } = author;
  return (
    <div className="post">
      <h3>
        {profileImageUrl ?
            <img className="profile-image" src={profileImageUrl} alt="profile"/> :
            undefined}
        {username}
        </h3>
      <p>{text}</p>
    </div>
  );
}

export default PostBox;
