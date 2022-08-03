/* here i have created redux for doctor state to used as a global state for 
  entire application  
  for this thing i have used react reduxjs/toolkit which is update version */

import { createSlice } from "@reduxjs/toolkit";

/*here i have declared intial state of doctorslice to used for entire application and 
perform CURD operation in my doctor module such as add Doctor, show doctor list , 
update doctor and delete doctor
*/

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

/*here i have creted doctorSlice by using bulit-in method createSlice
and perform define the code behind intial state of doctorslice in reducer which is 
implementing the behaviour of action
*/

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

/* Action creators are generated for each case reducer function
 */

export const {
  storeDoctorInRedux,
  toggleDoctorsPassword,
  toggleAddDoctor,
  resetState,
  setUpdateDoctor,
  setDoctorViewModel,
} = doctorSlice.actions;

/* exporting the component for other component
 */

export default doctorSlice.reducer;
