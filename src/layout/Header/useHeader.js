import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/auth/userSlice';
import { consLogged } from '../../const/consLogged';
import headerData from './headerData.json';

export const useHeader = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { logged, user } = useSelector(state => state.userReducer);
  const isLoggedIn = logged === consLogged.LOGGED;

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return {
    data: headerData,
    isNavCollapsed,
    isLoggedIn,
    user,
    handleNavCollapse,
    isActive,
    handleLogout
  };
};