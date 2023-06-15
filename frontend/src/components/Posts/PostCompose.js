import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, composePost, fetchPosts, receiveErrors } from "../../store/posts";
import PostBox from "./PostBox";
import "./PostCompose.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PostCompose() {
  const fileRef = useRef();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [text, setText] = useState("");
  const history = useHistory()
  const dispatch = useDispatch();
  const author = useSelector((state) => state.session.user);
  const newPost = useSelector((state) => state.posts.new);
  const errors = useSelector((state) => state.errors.posts);

  const image = author.profileImageUrl;


  const handleSubmit = (e) => {
    e.preventDefault();
      if (images.length === 0) {
      // Display an error or show a message indicating that at least one image is required
      return;
    }
    dispatch(clearPostErrors());
    dispatch(composePost(text, images))
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setImageUrls([])
        console.log("Error while creating post");
      });
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
                  <img src={imageUrls} alt="" className="upload-photo-image"></img>
                ) : <>
                    <div className="icon-style">
                      <i className="fa-solid fa-camera"></i>
                    </div>
                    <h1>Images to Upload</h1>
                    </>}
              </div>
              <div className="upload-photo-btn">
                <input
                  className="create-page-file-input"
                  type="file"
                  ref={fileRef}
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={updateFiles}
                />
              </div>
            </div>
            <div className="upload-photo"></div>
            <div className="create-post-description">
              <div className="user-details">
                <img src={image} alt="" />
                <h1 className="create-usersname">{author.username}</h1>
              </div>
              <div className="create-description">
                {" "}
                <textarea
                  type="textarea"
                  value={text}
                  onChange={update}
                  placeholder="Write your post..."
                  required
                  className="create-textarea"
                />
              </div>
              <div className="errors">{errors?.text}</div>
              <div className="post-btn-style">
                <input
                  type="submit"
                  className="post-submit-btn"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostCompose;
