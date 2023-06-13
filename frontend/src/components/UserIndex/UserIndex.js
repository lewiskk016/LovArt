import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserObject } from '../../store/user';

const UserIndex = () => {
  const dispatch = useDispatch();
  const { authorId } = useParams(); // Access the authorId parameter from the URL

  const author = useSelector(state => {
    return state.user.user; // Adjust the selector based on your state structure
  });

  useEffect(() => {
    dispatch(fetchUserObject(authorId));
  }, [dispatch, authorId]);

  return (
    <div>
      <h1>Profile Page</h1>
      {/* Display author information here */}
      {author && (
        <div>
          <p>Username: {author.username}</p>
          {/* Display other profile information */}
        </div>
      )}
    </div>
  );
};

export default UserIndex;
