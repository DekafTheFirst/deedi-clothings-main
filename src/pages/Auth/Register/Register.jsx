import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, updateUser } from '../../../redux/authReducer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    dispatch(registerUser({ email, password, username }));
  };
  // const handleRegister = async (email, password, username, photoURL) => {

  //   try {
  //     // Register user
  //     const resultAction = dispatch(registerUser({ email, password, username, photoURL }));
  //     if (registerUser.fulfilled.match(resultAction)) {
  //       // Profile update is optional and should be done after registration
  //       dispatch(updateProfileThunk({ username, photoURL }));
  //     } else {
  //       // Handle registration error
  //       console.error('Registration failed:', resultAction.payload);
  //     }
  //   } catch (error) {
  //     console.error('Error handling registration:', error);
  //   }
  // };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Display Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;