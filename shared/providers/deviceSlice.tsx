import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DeviceState {
  registered: boolean;
  data?: DeviceIdentity;
}

export interface DeviceIdentity {
  id?: string;
  token?: string;
  fcmToken?: string;
}

const initialState: DeviceState = {
  registered: false,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    registerDevice: (state, action: PayloadAction<DeviceIdentity>) => {
      (state.data = action.payload), (state.registered = true);
    },
    clearDeviceState: (state) => {
      (state.data = undefined), (state.registered = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerDevice, clearDeviceState } = deviceSlice.actions;

export default deviceSlice.reducer;
