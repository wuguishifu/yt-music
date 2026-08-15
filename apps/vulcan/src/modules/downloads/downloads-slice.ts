import { createSlice } from '@reduxjs/toolkit';

type DownloadsSliceState = {};

const initialState: DownloadsSliceState = {};

export const downloadsSlice = createSlice({
  name: 'downloads',
  initialState,
  reducers: {},
});

export const {
  name: downloadsSliceName,
  reducer: downloadsReducer,
  actions: downloadsActions,
} = downloadsSlice;
