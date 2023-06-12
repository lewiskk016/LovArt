import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, composePost } from '../../store/posts';
import PostBox from './PostBox';
import './PostCompose.css';
import { useRef } from 'react';

function PostCompose () {
  const fileRef = useRef();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
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
    dispatch(composePost(text, images));
    setImages([]);
    setImageUrls([]);
    setText('');
    fileRef.current.value = null;
  };

  const update = e => setText(e.currentTarget.value);

  const updateFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length)
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }
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
        <label>
          Images to Upload
          <input
            type="file"
            ref={fileRef}
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles} />
        </label>
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="post-preview">
        <h3>Post Preview</h3>
        {(text || imageUrls.length !== 0) ?                  // <-- MODIFY THIS LINE
            <PostBox post={{text, author, imageUrls}} /> : // <-- MODIFY THIS LINE
            undefined}
      </div>
      <div className="previous-post">
        <h3>Previous Post</h3>
        {newPost ? <PostBox post={newPost} /> : undefined}
      </div>
    </>
  )
}

export default PostCompose;
