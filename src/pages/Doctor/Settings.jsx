/* Action creators are generated for each case reducer function
 importing useEffect hook from react which is didMount component in 
 react life cycle
*/

import { useEffect } from "react";
import {
  DeleteUserIcon,
  EyesIcon,
  AddUserIcon,
  UpdateUserIcon,
} from "../../components/SVGIcons";

/* importing fetching doctor module API  to perform CURD 
operation such as add doctor , udpate doctor , view doctor
and delete doctor 
*/

import {
  FETCH_DOCTORS_LIST_ENDPOINT,
  ADD_DOCTORS_ENDPOINT,
  UPDATE_DOCTORS_ENDPOINT,
  DELETE_DOCTORS_ENDPOINT,
} from "../../utils/constants";

import AddDoctorForm from "../../components/AddDoctorForm";
import UpdateDoctorForm from "../../components/UpdateDoctorForm";
import { useSelector, useDispatch } from "react-redux"; // importing react redux

/* importing redux Action creators are generated for each case reducer function
store ,toggle etc and configration of redux
*/

import {
  storeDoctorInRedux,
  toggleDoctorsPassword,
  toggleAddDoctor,
  setUpdateDoctor,
  setDoctorViewModel,
  resetState,
} from "../../config/doctorSlice";

/* i have created functional compeonent whicb name has Settings and return  react jsx forms of doctor table
and presenting database of doctor from the backend 
*/
/* i have take referance of redux and gives dispatch method of redux
for perform CURD oepration 
*/

export default function Settings(props) {
  const { doctorsList, addDoctor, showUpdateDoctor, showDoctorViewModel } =
    useSelector((state) => state.doctorReducer);
  const dispatch = useDispatch();

  /* didMount component arrow funtion and fetching doctors data
   */

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  /* fetching doctor list from backend using api's using GET method
    and 
    .then((response) => response.json()) conveting it  into json format
   because of its cureently in string fromat

   const converted = data.map((item) - coverted data is mapping with item and store
   into redux

*/
  const fetchDoctorsData = () => {
    fetch(FETCH_DOCTORS_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json()) //here we converting it into json format
      .then((data) => {
        const converted = data.map((item) => {
          return { ...item, showPassword: false };
        });
        dispatch(storeDoctorInRedux(converted)); // redux
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* adding doctor data using POST method
   .then((response) => response.json()) conveting it  into json format
   because of its cureently in string fromat

   const converted = data.map((item) - coverted data is mapping with item and store
   into redux
*/

  const onAddDoctorSubmit = (body) => {
    fetch(ADD_DOCTORS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(
          `${JSON.stringify([...Object.values(data)])} Added Successfully.`
        );
        dispatch(toggleAddDoctor(false));
        fetchDoctorsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  /* updating doctor data using PUT method
   .then((response) => response.json()) conveting it  into json format
   because of its cureently in string fromat

   const converted = data.map((item) - coverted data is mapping with item and store
   into redux
*/

  const onUpdateDoctorSubmit = (body) => {
    fetch(UPDATE_DOCTORS_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Updated Successfully.`);

        dispatch(
          setUpdateDoctor({
            visible: false,
            payload: null,
          })
        );
        fetchDoctorsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  /* delete doctor data using DELETE method based on doctor_id
   .then((response) => response.json()) conveting it  into json format
   because of its cureently in string fromat

   const converted = data.map((item) - coverted data is mapping with item and store
   into redux
*/
  const deleteDoctor = (doctor_id) => {
    fetch(`${DELETE_DOCTORS_ENDPOINT}/${doctor_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${doctor_id} deleted successfully.`);
        fetchDoctorsData();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const viewList = (currentObject) => {
    delete currentObject.tests;
    delete currentObject.showPassword;
    return Object.keys(currentObject);
  };

  return (
    <>
      <div className="flex justify-end gap-4">
        {/* this is button to create doctor data and send to database in backend */}
        <button
          onClick={(event) => {
            event.preventDefault();
            dispatch(resetState());
            dispatch(toggleAddDoctor(!addDoctor));
          }} // event handling when onclick for
          className="flex items-center h-10 gap-1 text-white bg-blue-500 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-600"
        >
          <AddUserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Add Doctor</span>
        </button>

        {/* <button
          onClick={(event) => {
            event.preventDefault();

            dispatch(resetState());

            if (showUpdateDoctor.visible) {
              return;
            }

            let data = prompt(`Enter doctor's id`);
            if (!data) {
              alert("doctor id can not be empty.");
              return;
            }
            data = +data;

            const filterd = doctorsList.filter(
              (item) => item.doctorId === data
            );
            if (filterd.length) {
              dispatch(
                setUpdateDoctor({
                  payload: filterd[0],
                  visible: !showUpdateDoctor.visible,
                })
              );
            } else {
              alert("doctor id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-500 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-600"
        >
          <UpdateUserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Update Doctor</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();

            dispatch(resetState());

            let data = prompt(`Enter doctor's id`);
            if (!data) {
              alert("doctor id can not be empty.");
              return;
            }
            data = +data;

            const filterd = doctorsList.filter(
              (item) => item.doctorId === data
            );
            if (filterd.length) {
              deleteDoctor(data);
            } else {
              alert("doctor id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-red-500 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-red-600"
        >
          <DeleteUserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Delete Doctor</span>
        </button> */}
      </div>

      {/* ternary */}

      {addDoctor ? <AddDoctorForm onFormSubmit={onAddDoctorSubmit} /> : null}

      {showUpdateDoctor.visible ? (
        <UpdateDoctorForm
          onFormSubmit={onUpdateDoctorSubmit}
          payload={showUpdateDoctor.payload}
        />
      ) : null}

      {showDoctorViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-50 rounded-lg shadow-md">
          <div className="mt-12 flex flex-col w-5/12">
            {viewList({ ...showDoctorViewModel.payload }).map((key, i) => (
              <div key={i} className="flex justify-between">
                <h3 className="basis-1/2 text-xl font-bold capitalize">
                  {key} :
                </h3>

                <h3 className="basis-1/2 text-lg">
                  {showDoctorViewModel.payload[key]}
                </h3>
              </div>
            ))}
          </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              // redux dispatch method i have used here
              dispatch(
                setDoctorViewModel({
                  visible: false,
                  payload: null,
                })
              );
            }}
            className="mt-8 mb-12 bg-blue-400 hover:bg-blue-500 hover:shadow-lg px-4 py-1 rounded-lg self-center"
          >
            Done
          </button>
        </div>
      ) : null}

      {/* here i created table structure with doctor fields and returning database and performing
      CURD opraton */}
      <table className="mt-6 min-w-full text-center">
        <thead className="border-b bg-gray-800">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Username
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Consultation Time
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Mobile
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Address
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Password
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {doctorsList.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-1 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                {item.doctorId}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.doctorName}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.doctorUsername}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.doctorConsultationTime}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.doctorMobile}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.doctorEmail}
              </td>
              <td className="text-base max-w-[140px] text-gray-900 font-normal px-2 py-4">
                {item.doctorAddress}
              </td>
              <td className="text-base max-w-[90px] text-gray-900 font-normal px-2 py-4 whitespace-nowrap">
                <div className="flex justify-between">
                  <input
                    className="max-w-[80px]"
                    disabled={true}
                    value={item.doctorPassword}
                    type={item.showPassword ? "text" : "password"}
                  />
                  <button
                    onClick={(event) => {
                      dispatch(toggleDoctorsPassword(item)); // redux
                    }}
                  >
                    <EyesIcon className="w-4 h-4 fill-gray-500" />
                  </button>
                </div>
              </td>
              <td className="flex gap-1 justify-center text-base text-gray-900 font-normal px-0 py-4 whitespace-nowrap">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(resetState());
                    dispatch(
                      setUpdateDoctor({
                        payload: item,
                        visible: !showUpdateDoctor.visible,
                      })
                    );
                  }}
                  className="text-white bg-green-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-green-500"
                >
                  update
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(resetState());

                    deleteDoctor(item.doctorId);
                  }}
                  className="text-white bg-red-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-red-500"
                >
                  delete
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(resetState());
                    dispatch(
                      setDoctorViewModel({
                        visible: true,
                        payload: item,
                      })
                    );
                  }}
                  className="text-white bg-cyan-400 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-cyan-500"
                >
                  view
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
