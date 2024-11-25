import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { data: dataReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
