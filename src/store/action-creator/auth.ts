import axios from 'axios';
import { AppDispatch } from '..';
import { useAppDispatch } from '../../hooks/redux';
import { DataFormAuth, DataFormType } from '../../types/auth';
import { authSlice } from '../reducers/authReducer';

//Register
export const authRegister = (data: DataFormAuth) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetch());

    const res = await axios.post('https://blog.kata.academy/api/users', {
      user: {
        username: data.username,
        password: data.pass,
        email: data.email,
      },
    });
    dispatch(authSlice.actions.authRegister());
    dispatch(authSlice.actions.authUser(res.data.user));
    localStorage.setItem('token', res.data.user.token);
  } catch (error: any) {
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};
// Login
export const authLogin = (data: DataFormAuth) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetch());
    const res = await axios.post('https://blog.kata.academy/api/users/login', {
      user: {
        email: data.email,
        password: data.pass,
      },
    });
    dispatch(authSlice.actions.authLogin());
    localStorage.setItem('token', res.data.user.token);
    dispatch(authSlice.actions.authUser(res.data.user));
  } catch (error: any) {
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};
//Edit Profile
export const editProfile = (data: DataFormType, token: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetch());
    const newData = { ...data };
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.put('https://blog.kata.academy/api/user/', {
      user: {
        ...newData,
      },
    });

    dispatch(authSlice.actions.authLogin());
    dispatch(authSlice.actions.authUser(res.data.user));
  } catch (error: any) {
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};
//Session Auth
export const authSession = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(authSlice.actions.authFetch());
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      const res = await axios.get('https://blog.kata.academy/api/user/', {});

      dispatch(authSlice.actions.authLogin());
      dispatch(authSlice.actions.authUser(res.data.user));
    } else return;
  } catch (error: any) {
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};

//Log Out
export const LogOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  dispatch(authSlice.actions.authLogout());
};
