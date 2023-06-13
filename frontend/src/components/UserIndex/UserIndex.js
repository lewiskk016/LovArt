
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPostErrors, fetchPosts } from '../../store/posts';


const UserIndex = () => {
    const { username } = useParams();


    return (
      <div>
        <h1>Profile Page</h1>
        <p>Username: {username}</p>
        {/* Add profile information for the given username */}
      </div>
    );
  };

export default UserIndex