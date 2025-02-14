import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload.trim().toLowerCase(); 
    },
  },
});

export const selectNameFilter = (state) => state.filters.name; 

export const filtersReducer = filtersSlice.reducer;

export const { changeFilter } = filtersSlice.actions;