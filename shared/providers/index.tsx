import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import deviceReducer from "./deviceSlice";
import globalReducer from "./globalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authListener from "./listeners/authListener";
import deviceListener from "./listeners/deviceListener";
import globalListener from "./listeners/globalListener";

const reducers = combineReducers({
  //   counter: counterReducer,
  auth: authReducer,
  device: deviceReducer,
  global: globalReducer,
  //   modal: modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "global", "device"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend([
      authListener,
      deviceListener,
      globalListener,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
