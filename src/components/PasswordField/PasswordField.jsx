import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './PasswordField.scss'
const PasswordField = ({ name, value, onChange, onBlur, touched }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (<div className="inputField password-field">
    <input type={showPassword ? "text": 'password'} name={name} id="" onChange={onChange} value={value} onBlur={onBlur}/>
      <IconButton onClick={handleClickShowPassword} className='toggle'>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>

  </div>
  );
};

export default PasswordField;
