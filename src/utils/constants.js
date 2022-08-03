export const BACKEND_ENDPOINT = "http://localhost:9090"; // your backend URL

export const ADMIN_LOGIN_ENDPOINT = `${BACKEND_ENDPOINT}/adminLogin`;
export const DOCTOR_LOGIN_ENDPOINT = `${BACKEND_ENDPOINT}/doctorLogin`;
export const PATIENT_LOGIN_ENDPOINT = `${BACKEND_ENDPOINT}/patientLogin`;

export const ADMIN_SIGNUP_ENDPOINT = `${BACKEND_ENDPOINT}/adminLogin`;
export const DOCTOR_SIGNUP_ENDPOINT = `${BACKEND_ENDPOINT}/doctorLogin`;
export const PATIENT_SIGNUP_ENDPOINT = `${BACKEND_ENDPOINT}/patientLogin`;

export const FETCH_DOCTORS_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/viewdoctorslist`;
export const ADD_DOCTORS_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/adddoctor`;
export const UPDATE_DOCTORS_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/updatedoctor`;
export const DELETE_DOCTORS_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/deletedoctor`;

export const FETCH_TEST_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/alltests`;
export const ADD_TEST_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/test/add`;
export const UPDATE_TEST_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/test/update`;
export const DELETE_TEST_ENDPOINT = `${BACKEND_ENDPOINT}/onlineeyeclinic/test/remove`;

export const FETCH_APPOINTMENT_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/v1/viewallappointments`;
export const ADD_APPOINTMENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/bookappointment`;
export const UPDATE_APPOINTMENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/updateappointment`;
export const DELETE_APPOINTMENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/cancelappointment`;

export const FETCH_PATIENT_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/v1/patient/viewpatientlist`;
export const ADD_PATIENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/patient/addpatient`;
export const UPDATE_PATIENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/patient/updatepatient`;
export const DELETE_PATIENT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/patient/delete`;

export const FETCH_REPORT_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/v1/allreportsbydate`;
export const ADD_REPORT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/addreport`;
export const UPDATE_REPORT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/updatereport`;
export const DELETE_REPORT_ENDPOINT = `${BACKEND_ENDPOINT}/v1/delete`;

export const FETCH_ADMIN_LIST_ENDPOINT = `${BACKEND_ENDPOINT}/v1/allreportsbydate`;
export const ADD_ADMIN_ENDPOINT = `${BACKEND_ENDPOINT}/v1/addreport`;
export const UPDATE_ADMIN_ENDPOINT = `${BACKEND_ENDPOINT}/v1/updatereport`;
export const DELETE_ADMIN_ENDPOINT = `${BACKEND_ENDPOINT}/v1/delete`;
