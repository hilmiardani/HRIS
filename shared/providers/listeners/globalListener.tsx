import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { changeAxiosHeader } from "@/shared/utils";

const globalListener = createListenerMiddleware();
globalListener.startListening({
  predicate: (action, currState, prevState) =>
    (currState as RootState)?.global?.lang !== (prevState as RootState)?.global?.lang,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    // console.log('changing Accept-Language header...')
    changeAxiosHeader("Accept-Language", (state as RootState)?.global?.lang);
  },
});

export default globalListener.middleware;
