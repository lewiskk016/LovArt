
import "./PostBox.css"
import image from "./monet.jpeg"
import { useDispatch, useSelector } from "react-redux";
import { deleteUserPosts } from "../../store/posts"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function PostBox ({ post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId }}) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts);
  const images = imageUrls?.map((url, index) => {
    return <img className="post-image" key ={url} src={url} alt={`postImage${index}`} />
  
  });

  const handleDelete = () => {
    dispatch(deleteUserPosts(postId));
  }
 

  return (
<div className="container">
	 <div className="card">
   <div className="user-image">
            {profileImageUrl ? (
              <img
                className="profile-image"
                src={profileImageUrl}
                alt="profile"
              />
            ) : undefined}
    </div>
	     <h5><u></u></h5>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
        <img className="rotate-img" src={image} alt=""></img>	
        <small></small>
	</div>	
</div>
  );
}

export default PostBox;
