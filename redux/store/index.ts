import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/* this should be handled in a different file but for the simplicity of the demo I kept it here */
export const fix = createAsyncThunk("car/fixStatus", async () => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 5000)
  );
});

/* this code is extra, adds interface to the initial state */
interface IinitialState {
  oilLevel: number;
  isEngineOn: boolean;
  error: null | string;
  isBeingFixed: boolean;
}

const initialState = {
  oilLevel: 100,
  isEngineOn: false,
  error: null,
  isBeingFixed: false,
} as IinitialState;

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    start(state) {
      state.isEngineOn = true;
    },
    go(state, action: PayloadAction<number>) {
      const newOilLevel = (state.oilLevel -= action.payload);
      state.oilLevel = Math.max(newOilLevel, 0);
    },
    stop(state) {
      state.isEngineOn = false;
    },
    notifyError(state) {
      state.isEngineOn = false;
      state.error = "something is wrong with the oil pump";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fix.pending, (state) => {
        state.error = null;
        state.isBeingFixed = true;
      })
      .addCase(fix.fulfilled, (state) => {
        state.isBeingFixed = false;
        state.isEngineOn = true;
        state.oilLevel = 100;
      });
  },
});

const store = configureStore({
  reducer: {
    car: carSlice.reducer,
  },
});

/* Define types for useDispatch and useSelector hooks */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* explicitly type the hooks and export them */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const carActions = carSlice.actions;

export default store;
