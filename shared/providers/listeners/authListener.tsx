import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { changeAxiosHeader } from "@/shared/utils";

const authListener = createListenerMiddleware();
authListener.startListening({
  predicate: (action, currState, prevState) =>
    (currState as RootState)?.auth?.data?.token !== (prevState as RootState)?.auth?.data?.token,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    console.log("changing authorization header...");
    changeAxiosHeader(
      "Authorization",
      (state as RootState)?.auth?.data?.token
        ? `Bearer ${(state as RootState)?.auth?.data?.token}`
        : undefined
    );
  },
});

export default authListener.middleware;
