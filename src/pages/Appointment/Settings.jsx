import { useState, useEffect } from "react";
import { UserIcon, EyesIcon } from "../../components/SVGIcons";
import {
  FETCH_APPOINTMENT_LIST_ENDPOINT,
  ADD_APPOINTMENT_ENDPOINT,
  UPDATE_APPOINTMENT_ENDPOINT,
  DELETE_APPOINTMENT_ENDPOINT,
} from "../../utils/constants";

import AddAppointmentForm from "../../components/AddAppointmentForm";
import UpdateAppointmentForm from "../../components/UpdateAppointmentForm";
import { current } from "@reduxjs/toolkit";

export default function Settings(props) {
  const [appointmentList, setAppointmentList] = useState([]);
  const [addAppointment, setAddAppointment] = useState(false);
  const [showUpdateAppointment, setShowUpdatAppointment] = useState({
    visible: false,
    payload: null,
  });

  const [showAppointmentViewModel, setShowAppointmentViewModel] = useState({
    visible: false,
    payload: null,
  });

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  // DONE
  const fetchAppointmentsData = () => {
    fetch(FETCH_APPOINTMENT_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DONE
  const onAddAppointmentSubmit = (body) => {
    fetch(ADD_APPOINTMENT_ENDPOINT, {
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
        setAddAppointment(false);
        fetchAppointmentsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
  const onUpdateAppointmentSubmit = (body) => {
    fetch(UPDATE_APPOINTMENT_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Updated Successfully.`);

        setShowUpdatAppointment({
          visible: false,
          payload: null,
        });
        fetchAppointmentsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  const deleteTest = (appointment_id) => {
    fetch(`${DELETE_APPOINTMENT_ENDPOINT}/${appointment_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${appointment_id} deleted successfully.`);
        fetchAppointmentsData();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="flex justify-end gap-4">
        <button
          onClick={(event) => {
            event.preventDefault();
            setAddAppointment(!addAppointment);
          }}
          className="flex items-center h-10 gap-1 text-white bg-green-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-green-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Add Test</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();

            if (showUpdateAppointment.visible) {
              return;
            }

            let data = prompt(`Enter Test's id`);
            if (!data) {
              alert("Test id can not be empty.");
              return;
            }
            data = +data;

            const filterd = appointmentList.filter(
              (item) => item.testId === data
            );
            if (filterd.length) {
              setShowUpdatAppointment({
                payload: filterd[0],
                visible: !showUpdateAppointment.visible,
              });
            } else {
              alert("Test id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Update Test</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();
            let data = prompt(`Enter test's id`);
            if (!data) {
              alert("test id can not be empty.");
              return;
            }
            data = +data;

            const filterd = appointmentList.filter(
              (item) => item.testId === data
            );
            if (filterd.length) {
              deleteTest(data);
            } else {
              alert("test id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-red-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-red-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Delete Test</span>
        </button>
      </div>

      {addAppointment ? (
        <AddAppointmentForm onFormSubmit={onAddAppointmentSubmit} />
      ) : null}

      {showUpdateAppointment.visible ? (
        <UpdateAppointmentForm
          onFormSubmit={onUpdateAppointmentSubmit}
          payload={showUpdateAppointment.payload}
        />
      ) : null}

      {showAppointmentViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg">
          <div className="mt-12 flex flex-col items-start gap-2 ">
            {Object.keys(showAppointmentViewModel.payload).map((key) => (
              <h3 className="text-xl">
                <strong>{key}:</strong> {showAppointmentViewModel.payload[key]}
              </h3>
            ))}

            <button
              onClick={(event) => {
                event.preventDefault();

                setShowAppointmentViewModel({
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
              Date
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Time
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Fees
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-1 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                {item.appointmentId}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.dateOfAppointment}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.timeOfAppointment}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.consultationFee}
              </td>

              <td className="flex gap-1 justify-center text-base text-gray-900 font-normal px-0 py-4 whitespace-nowrap">
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    setShowUpdatAppointment({
                      payload: item,
                      visible: !showUpdateAppointment.visible,
                    });
                  }}
                  className="text-white bg-green-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-green-500"
                >
                  update
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteTest(item.testId);
                  }}
                  className="text-white bg-red-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-red-500"
                >
                  delete
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    console.log(item);

                    setShowAppointmentViewModel({
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
