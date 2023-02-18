import axios from 'axios';
import { AppDispatch } from '..';
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../reducers/authReducer';

//Register
export const authRegister = (data: any) => async (dispatch: AppDispatch) => {
  try {
    console.log('Auth', data);
    dispatch(authSlice.actions.authFetch());

    const res = await axios.post('https://blog.kata.academy/api/users', {
      user: {
        username: data.username,
        password: data.pass,
        email: data.email,
      },
    });
    dispatch(authSlice.actions.authRegister());
    localStorage.setItem('token', res.data.user.token);
    console.log('>>>>>>>>>', res);
  } catch (error: any) {
    console.log(error.response.data.errors);
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};
// Login
export const authLogin = (data: any) => async (dispatch: AppDispatch) => {
  try {
    console.log('AuthLogin', data);
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
    console.log('>>>>>>>>>', res);
  } catch (error: any) {
    console.log(error.response.data.errors);

    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};
//Edit Profile
export const editProfile = (data: any, token: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetch());

    console.log('editProfile', data);
    const newData = { ...data };
    // !data.avatar ? delete newData.image : null;
    console.log('editProfileNew', newData);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.put('https://blog.kata.academy/api/user/', {
      user: {
        ...newData,
      },
    });

    dispatch(authSlice.actions.authLogin());
    dispatch(authSlice.actions.authUser(res.data.user));
    console.log('>>>>>>>>>', res);

    // const res = await axios.get<any>('https://blog.kata.academy/api/articles?&limit=5&offset');
    // dispatch(authSlice.actions.authRegister());
  } catch (error: any) {
    console.log(error.response.data.errors);
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
      console.log('>>>>>>>>>', res);
    } else return;
  } catch (error: any) {
    console.log(error.response.data.errors);
    dispatch(authSlice.actions.authError(error.response.data.errors));
  }
};

//Log Out
export const LogOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  dispatch(authSlice.actions.authLogout());
};
