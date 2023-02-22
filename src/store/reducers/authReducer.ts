import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthStateType {
  logined: boolean;
  error: any;
  user: {
    username?: string;
    email?: string;
    token?: string;
    bio?: string;
    image?: string;
  };
  authLoading: boolean;
  token: string;
}

const initialState: AuthStateType = {
  logined: false,
  error: '',
  user: {},
  token: '',
  authLoading: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRegister(state) {
      state.logined = true;
      state.error = '';
    },
    authFetch(state) {
      state.authLoading = true;
      state.error = '';
    },
    authUser(state, action: PayloadAction<any>) {
      state.logined = true;
      state.user = action.payload;
      state.error = '';
      state.authLoading = false;
    },
    authLogin(state) {
      state.logined = true;
      state.error = '';
      state.authLoading = false;
    },
    authError(state, action: PayloadAction<string>) {
      state.logined = false;
      state.error = action.payload;
      state.authLoading = false;
    },
    authLogout(state) {
      state.logined = false;
      state.error = '';
      state.user = {};
    },
    authSetToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    resetError(state) {
      state.error = '';
    },
  },
});

export default authSlice.reducer;
