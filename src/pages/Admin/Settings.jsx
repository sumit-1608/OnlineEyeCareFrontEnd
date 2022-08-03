import { useState, useEffect } from "react";
import { UserIcon, EyesIcon } from "../../components/SVGIcons";
import {
  FETCH_ADMIN_LIST_ENDPOINT,
  ADD_ADMIN_ENDPOINT,
  UPDATE_ADMIN_ENDPOINT,
  DELETE_ADMIN_ENDPOINT,
} from "../../utils/constants";

import AddAdminForm from "../../components/AddAdminForm";
import UpdateAdminForm from "../../components/UpdateAdminForm";
import { current } from "@reduxjs/toolkit";
import moment from "moment";

export default function Settings(props) {
  const [adminList, setAdminList] = useState([]);
  const [addAdmin, setAddAdmin] = useState(false);
  const [showUpdateAdmin, setShowUpdatAdmin] = useState({
    visible: false,
    payload: null,
  });

  const [showAdminViewModel, setShowAdminViewModel] = useState({
    visible: false,
    payload: null,
  });

  useEffect(() => {
    fetchAdminsData();
  }, []);

  // DONE
  const fetchAdminsData = () => {
    fetch(FETCH_ADMIN_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const converted = data.map((item) => {
          delete item.doctor_Id;
          return item;
        });

        setAdminList(converted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DONE
  const onAddAdminSubmit = (body) => {
    fetch(ADD_ADMIN_ENDPOINT, {
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
        setAddAdmin(false);
        fetchAdminsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
  const onUpdateAdminSubmit = (body) => {
    fetch(UPDATE_ADMIN_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Updated Successfully.`);

        setShowUpdatAdmin({
          visible: false,
          payload: null,
        });
        fetchAdminsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  const deleteTest = (appointment_id) => {
    fetch(`${DELETE_ADMIN_ENDPOINT}/${appointment_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${appointment_id} deleted successfully.`);
        fetchAdminsData();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <>
      <div className="flex justify-end gap-4">
        <button
          onClick={(event) => {
            event.preventDefault();
            setAddAdmin(!addAdmin);
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Book Appointment</span>
        </button>

        {/* <button
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
          <span className="uppercase font-semibold">Update Appointment</span>
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
          <span className="uppercase font-semibold">Delete Appointment</span>
        </button> */}
      </div>

      {addAdmin ? <AddAdminForm onFormSubmit={onAddAdminSubmit} /> : null}

      {showUpdateAdmin.visible ? (
        <UpdateAdminForm
          onFormSubmit={onUpdateAdminSubmit}
          payload={showUpdateAdmin.payload}
        />
      ) : null}

      {showAdminViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg">
          <div className="mt-12 flex flex-col items-start gap-2 ">
            {Object.keys(showAdminViewModel.payload).map((key) => (
              <h3 key={key} className="text-xl">
                <strong>{key}:</strong> {showAdminViewModel.payload[key]}
              </h3>
            ))}

            <button
              onClick={(event) => {
                event.preventDefault();

                setShowAdminViewModel({
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
          {adminList.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b hover:bg-gray-200 cursor-pointer"
            >
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

                    setShowUpdatAdmin({
                      payload: item,
                      visible: !showUpdateAdmin.visible,
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
                    setShowAdminViewModel({
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
