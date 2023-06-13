import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPostErrors, fetchPosts, fetchUserPosts } from '../../store/posts';


const UserIndex = () => {
    const  { username }  = useParams();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchUserPosts())
    })

  return (
    <div>
      <h1>Profile Page</h1>
      {/* Display author information here */}
      {username && (
        <div>
          <p>Username: {username}</p>
          {/* Display other profile information */}
        </div>
      )}
    </div>
  );
};

export default UserIndex;
