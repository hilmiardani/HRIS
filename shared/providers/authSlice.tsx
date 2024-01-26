import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenData {
  token: string;
  expiredAt: number;
}

export interface UserAuthState {
  isLoggedIn: boolean;
  data?: UserAuthData;
}

export interface UserAuthData {
  id?: string;
  token?: string;
  email?: string;
  name?: string;
  thumbnail?: string;
  role?: string;
  //   authToken: {
  //     token: string;
  //     expiredAt: number;
  //   };
  //   refreshToken: {
  //     token: string;
  //     expiredAt: number;
  //   };
  //   fcm?: {
  //     token: string;
  //     registered: boolean;
  //   };
}

const initialState: UserAuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   /**
    //    * Redux Toolkit allows us to write "mutating" logic in reducers. It
    //    * doesn't actually mutate the state because it uses the Immer library,
    //    * which detects changes to a "draft state" and produces a brand new
    //    * immutable state based off those changes
    //    */
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    initializeUserState: (state, action: PayloadAction<UserAuthData>) => {
      console.log("redux login invoked");
      state.isLoggedIn = true;
      state.data = action.payload;

      // state = {
      //   ...state,
      //   isLoggedIn: true,
      //   data: { ...action.payload }
      // }
    },
    // updateAuthToken: (state, action: PayloadAction<TokenData>) => {
    //   if (state.data !== undefined) state.data.authToken = action.payload;
    // },
    // updateRefreshToken: (state, action: PayloadAction<TokenData>) => {
    //   if (state.data !== undefined) state.data.refreshToken = action.payload;
    // },
    invalidateAuth: (state) => {
      console.log("invalidating auth...");
      state.isLoggedIn = false;
      state.data = undefined;
    },
    logout: (state) => {
      (state.isLoggedIn = false), (state.data = undefined);
    },
    setAuth: (state, action: PayloadAction<UserAuthData>) => {
      // console.log('HEADER  : ', action.payload)
      state.data = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeUserState, logout, invalidateAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
