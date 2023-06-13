import { useDispatch, useSelector } from "react-redux";
import { deleteUserPosts } from "../../store/posts"
import "./ProfileBox.css"


function ProfileBox ({ post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId }}) {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts);

    const images = imageUrls?.map((url, index) => {
      return <img className="post-image" key ={url} src={url} alt={`postImage${index}`} />
    });
    const numCols = posts.length
  
    const handleDelete = () => {
      dispatch(deleteUserPosts(postId));
    }
    return (
        <div className="grid-container">
            <div className="grid-item">   
            </div>
        </div>
      );
    };


export default ProfileBox