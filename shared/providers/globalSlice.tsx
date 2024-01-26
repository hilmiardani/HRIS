import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LangType } from "../types";

export interface GlobalData {
  propertyId?: string;
  unitTypeId?: string;
  notifCount?: number;
}

export interface GlobalState {
  lang: LangType;
  globalData: GlobalData;
}

const initialState: GlobalState = {
  lang: "en",
  globalData: {}
};

export const globalSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
    setGlobalData: (state, action: PayloadAction<GlobalData>) => {
      state.globalData = action.payload;
    },
    clearGlobalState: (state) => {
      state.globalData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGlobalData, clearGlobalState } = globalSlice.actions;

export default globalSlice.reducer;
