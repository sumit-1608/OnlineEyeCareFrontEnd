import { useState, useEffect } from "react";
import { UserIcon, EyesIcon } from "../../components/SVGIcons";
import {
  FETCH_DOCTORS_LIST_ENDPOINT,
  ADD_DOCTORS_ENDPOINT,
  UPDATE_DOCTORS_ENDPOINT,
  DELETE_DOCTORS_ENDPOINT,
} from "../../utils/constants";

import AddDoctorForm from "../../components/AddDoctorForm";
import UpdateDoctorForm from "../../components/UpdateDoctorForm";
import { current } from "@reduxjs/toolkit";

export default function Settings(props) {
  const [addDoctor, setAddDoctor] = useState(false);
  const [showUpdateDoctor, setShowUpdateDoctor] = useState({
    visible: false,
    payload: null,
  });

  const [showDoctorViewModel, setShowDoctorViewModel] = useState({
    visible: false,
    payload: null,
  });

  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  // DONE
  const fetchDoctorsData = () => {
    fetch(FETCH_DOCTORS_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const converted = data.map((item) => {
          return { ...item, showPassword: false };
        });

        setDoctorsList(converted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DONE
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

        setAddDoctor(false);
        fetchDoctorsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
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
        alert(`Updated Added Successfully.`);

        setShowUpdateDoctor({
          visible: false,
          payload: null,
        });
        fetchDoctorsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
  const deleteDoctor = (doctor_id) => {
    fetch(`${DELETE_DOCTORS_ENDPOINT}/${doctor_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${doctor_id} deleted successfully.`);
        setAddDoctor(false);
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
        <button
          onClick={(event) => {
            event.preventDefault();
            setAddDoctor(!addDoctor);
          }}
          className="flex items-center h-10 gap-1 text-white bg-green-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-green-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Add Doctor</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();

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
              setShowUpdateDoctor({
                payload: filterd[0],
                visible: !showUpdateDoctor.visible,
              });
            } else {
              alert("doctor id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Update Doctor</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();
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
          className="flex items-center h-10 gap-1 text-white bg-red-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-red-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Delete Doctor</span>
        </button>
      </div>

      {addDoctor ? <AddDoctorForm onFormSubmit={onAddDoctorSubmit} /> : null}

      {showUpdateDoctor.visible ? (
        <UpdateDoctorForm
          onFormSubmit={onUpdateDoctorSubmit}
          payload={showUpdateDoctor.payload}
        />
      ) : null}

      {showDoctorViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg">
          <div className="mt-12 flex flex-col items-start gap-2 ">
            {viewList({ ...showDoctorViewModel.payload }).map((key) => (
              <h3 className="text-xl">
                <strong>{key}:</strong> {showDoctorViewModel.payload[key]}
              </h3>
            ))}

            <button
              onClick={(event) => {
                event.preventDefault();

                setShowDoctorViewModel({
                  visible: false,
                  payload: null,
                });
              }}
              className="mt-8 mb-12 bg-blue-400 hover:bg-blue-500 hover:shadow-lg px-4 py-1 rounded-lg self-center"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}

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
                      event.preventDefault();
                      item.showPassword = !item.showPassword;

                      setDoctorsList([...doctorsList]);
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

                    setShowUpdateDoctor({
                      payload: item,
                      visible: !showUpdateDoctor.visible,
                    });
                  }}
                  className="text-white bg-green-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-green-500"
                >
                  update
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteDoctor(item.doctorId);
                  }}
                  className="text-white bg-red-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-red-500"
                >
                  delete
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    setShowDoctorViewModel({
                      visible: true,
                      payload: item,
                    });
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
