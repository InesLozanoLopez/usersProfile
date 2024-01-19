import React from 'react';
import { logout } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };
  return (
    <button
      type="button"
      className="button"
      aria-label="To Log out"
      onClick={handleLogOut}
    >
      Log out
    </button>
  );
};

export default LogOut;
