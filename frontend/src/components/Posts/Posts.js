import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, fetchPosts } from "../../store/posts";
import PostBox from "./PostBox";
import "./PostBox.css";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  if (posts.length === 0) return <div>There are no posts</div>;

  return (
    <>
      <h2>All posts</h2>
      <div className="post-index-container">
        <div>
      {posts.map((post) => (
        <PostBox key={post._id} post={post} />
      ))}
      </div>
      </div>
    </>
  );
}

export default Posts;
