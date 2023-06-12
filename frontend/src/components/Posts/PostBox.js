import "./PostBox.css"

function PostBox ({ post: { text, author }}) {
  const { username } = author;
  return (
    <div className="post">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}

export default PostBox;