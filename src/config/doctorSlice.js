import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorsList: [],
  addDoctor: false,
  showUpdateDoctor: {
    visible: false,
    payload: null,
  },
  showDoctorViewModel: {
    visible: false,
    payload: null,
  },
};

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    storeDoctorInRedux: (state, action) => {
      state.doctorsList = action.payload;
    },
    toggleDoctorsPassword: (state, action) => {
      const objIndex = state.doctorsList.findIndex(
        (item) => item.doctorId === action.payload.doctorId
      );
      state.doctorsList[objIndex].showPassword =
        !state.doctorsList[objIndex].showPassword;
    },
    toggleAddDoctor: (state, action) => {
      state.addDoctor = action.payload;
    },
    setUpdateDoctor: (state, action) => {
      state.showUpdateDoctor = action.payload;
    },
    setDoctorViewModel: (state, action) => {
      state.showDoctorViewModel = action.payload;
    },
    resetState: (state) => {
      state.addDoctor = false;
      state.showUpdateDoctor = {
        visible: false,
        payload: null,
      };
      state.showDoctorViewModel = {
        visible: false,
        payload: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeDoctorInRedux,
  toggleDoctorsPassword,
  toggleAddDoctor,
  resetState,
  setUpdateDoctor,
  setDoctorViewModel,
} = doctorSlice.actions;

export default doctorSlice.reducer;
