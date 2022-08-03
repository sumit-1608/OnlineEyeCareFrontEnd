import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testList: [],
  addTest: false,
  showUpdateTest: {
    visible: false,
    payload: null,
  },
  showTestViewModel: {
    visible: false,
    payload: null,
  },
};

export const testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    storeTestInRedux: (state, action) => {
      state.testList = action.payload;
    },
    toggleAddTest: (state, action) => {
      state.addTest = action.payload;
    },
    setUpdateTest: (state, action) => {
      state.showUpdateTest = action.payload;
    },
    setTestViewModel: (state, action) => {
      state.showTestViewModel = action.payload;
    },
    resetState: (state) => {
      state.addTest = false;
      state.showUpdateTest = {
        visible: false,
        payload: null,
      };
      state.showTestViewModel = {
        visible: false,
        payload: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeTestInRedux,
  toggleAddTest,
  resetState,
  setUpdateTest,
  setTestViewModel,
} = testSlice.actions;

export default testSlice.reducer;
