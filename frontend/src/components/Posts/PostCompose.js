import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, composePost } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';

function PostCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newPost = useSelector(state => state.posts.new);
  const errors = useSelector(state => state.errors.posts);

  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composePost({ text })); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="compose-post" onSubmit={handleSubmit}>
        <input 
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your post..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="post-preview">
        <h3>Post Preview</h3>
        {text ? <PostBox post={{text, author}} /> : undefined}
      </div>
      <div className="previous-post">
        <h3>Previous Post</h3>
        {newPost ? <PostBox post={newPost} /> : undefined}
      </div>
    </>
  )
}

export default PostCompose;