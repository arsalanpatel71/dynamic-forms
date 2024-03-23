import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formConfigs: [],
  },
  reducers: {
    saveFormConfig: (state, action) => {
      state.formConfigs.push(action.payload);
    },
    deleteFormConfig: (state, action) => {
      state.formConfigs = state.formConfigs.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { saveFormConfig, deleteFormConfig } = formSlice.actions;

export const selectFormConfigs = (state) => state.form.formConfigs;

export default formSlice.reducer;
