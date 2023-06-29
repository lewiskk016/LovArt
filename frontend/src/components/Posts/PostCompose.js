import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPostErrors,
  composePost,
  fetchPosts,
  receiveErrors,
} from "../../store/posts";
import PostBox from "./PostBox";
import "./PostCompose.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PostCompose() {
  const fileRef = useRef();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [text, setText] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imagesError, setImagesError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const author = useSelector((state) => state.session.user);
  const newPost = useSelector((state) => state.posts.new);
  const errors = useSelector((state) => state.errors.posts);

  const image = author.profileImageUrl;

  useEffect(() => {
    if (errors && errors.text) {
      setDescriptionError(errors.text);
    } else {
      setDescriptionError("");
    }
  }, [errors?.text]);

  useEffect(() => {
    if (errors && errors.images) {
      setImagesError(errors.images);
    } else {
      setImagesError("");
    }
  }, [errors?.images]);

  useEffect(() => {
    // Clear error messages when there is a change in text or images
    if (text) {
      setDescriptionError("");
    }
    if (images.length > 0) {
      setImagesError("");
    }
    dispatch(clearPostErrors());
  }, [text, images, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationError = false;

    if (!text) {
      validationError = true;
      setDescriptionError("Description cannot be blank");
    } else if (text.length < 5 || text.length > 140) {
      validationError = true;
      setDescriptionError(
        "Description must be between 5 and 140 characters"
      );
    }

    if (images.length === 0) {
      validationError = true;
      setImagesError("At least one image is required");
    }

    if (!validationError) {
      dispatch(clearPostErrors());
      dispatch(composePost(text, images))
        .then(() => {
          setDescriptionError("");
          setImagesError("");
          setImageUrls([]);
          history.push("/");
        })
        .catch(() => {
          setImageUrls([]);
          // console.log("Error while creating post");
        });
      fileRef.current.value = null;
    }
  };

  let imageText;

  if (images.length === 0) {
    imageText = (
      <h1 className="create-imagetext">LovArt Accepts .jpg .jpeg .png</h1>
    );
  }

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
              {imageText}
              <div className="upload-photo-box">
                {imageUrls.length !== 0 ? (
                  <img
                    src={imageUrls}
                    alt=""
                    className="upload-photo-image"
                  />
                ) : (
                  <>
                    <div className="icon-style">
                      <i className="fa-solid fa-camera"></i>
                    </div>
                    <h1>Images to Upload</h1>
                  </>
                )}
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
                <textarea
                  type="textarea"
                  value={text}
                  onChange={update}
                  placeholder="Write your post between 5 and 140 characters..."
                  className="create-textarea"
                />
              </div>
              {descriptionError && (
                <div className="errors">{descriptionError}</div>
              )}
              {imagesError && <div className="errors">{imagesError}</div>}
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
