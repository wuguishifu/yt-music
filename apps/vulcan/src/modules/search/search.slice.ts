import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchSliceState = {
  recentSearches: string[];
};

const initialState: SearchSliceState = {
  recentSearches: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches.unshift(action.payload);
      state.recentSearches = state.recentSearches.slice(0, 10);
    },
  },
});

export const {
  name: searchSliceName,
  reducer: searchReducer,
  actions: searchActions,
} = searchSlice;
