import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, composePost } from "../../store/posts";
import PostBox from "./PostBox";
import "./PostCompose.css";
import { useRef } from "react";

function PostCompose() {
  const fileRef = useRef();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const author = useSelector((state) => state.session.user);
  const newPost = useSelector((state) => state.posts.new);
  const errors = useSelector((state) => state.errors.posts);

  const image = author.profileImageUrl;

  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(composePost(text, images));
    setImages([]);
    setImageUrls([]);
    setText("");
    fileRef.current.value = null;
  };

  const update = (e) => setText(e.currentTarget.value);

  const updateFiles = async (e) => {
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
          if (++filesLoaded === files.length) setImageUrls(urls);
        };
      });
    } else setImageUrls([]);
  };
  return (
    <>
      <div className="create-post-page">
        <div className="create-post-container">
          <form className="compose-post" onSubmit={handleSubmit}>
            <div className="photo-upload">
              <div className="upload-photo-box">
                {imageUrls.length !== 0 ? (
                  <img src={imageUrls} alt=""></img>
                ) : undefined}
                <div className="icon-style">
                  <i class="fa-solid fa-camera"></i>
                </div>
                <h1>Images to Upload</h1>
              </div>
              <div className="upload-photo-btn">
                <input
                  className="create-page-file-input"
                  type="file"
                  ref={fileRef}
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={updateFiles}
                />{" "}
              </div>
            </div>
            <div className="upload-photo"></div>
            <div className="create-post-description">
              <div className="user-details">
                <img src={image} alt="" />
                <h1>{author.username}</h1>
              </div>
              <div className="create-description">
                {" "}
                <input
                  type="textarea"
                  value={text}
                  onChange={update}
                  placeholder="Write your post..."
                  required
                />
              </div>
              <div className="post-btn-style">
                <input
                  type="submit"
                  className="post-submit-btn"
                  value="Submit"
                />
                <div className="errors">{errors?.text}</div>
              </div>
            </div>
          </form>
        </div>
        <div className="post-preview">
          <h3>Post Preview</h3>
          {text || imageUrls.length !== 0 ? (
            <PostBox post={{ text, author, imageUrls }} />
          ) : undefined}
        </div>
        <div className="previous-post">
          <h3>Previous Post</h3>
          {newPost ? <PostBox post={newPost} /> : undefined}
        </div>
      </div>
    </>
  );
}

export default PostCompose;
