import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { changeAxiosHeader } from "../../utils";

const deviceListener = createListenerMiddleware();
deviceListener.startListening({
  predicate: (action, currState, prevState) =>
    (currState as RootState)?.device?.data?.id !== (prevState as RootState)?.device?.data?.id,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    changeAxiosHeader("X-Client-Id", (state as RootState).device?.data?.id);
    changeAxiosHeader("X-Client-Token", (state as RootState).device?.data?.token);
  },
});

export default deviceListener.middleware;
