import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import { updateUser } from '../../../../redux/auth/authReducer';

const Profile = memo(() => {
  const user = useSelector((state) => state.auth.user);
  console.log('user', user)
  const [username, setUsername] = useState(user?.username || '');
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateUser({ id: user.id, username }));
  };

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
});

export default Profile;
