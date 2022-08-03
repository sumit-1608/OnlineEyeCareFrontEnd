import { useState, useEffect } from "react";
import { UserIcon, EyesIcon } from "../../components/SVGIcons";
import {
  FETCH_PATIENT_LIST_ENDPOINT,
  ADD_PATIENT_ENDPOINT,
  UPDATE_PATIENT_ENDPOINT,
  DELETE_PATIENT_ENDPOINT,
} from "../../utils/constants";

import AddPatientForm from "../../components/AddPatientForm";
import UpdatePatientForm from "../../components/UpdatePatientForm";
import moment from "moment";

export default function Settings(props) {
  const [patientList, setPatientList] = useState([]);
  const [addPatient, setAddPatient] = useState(false);
  const [showUpdatePatient, setShowUpdatePatient] = useState({
    visible: false,
    payload: null,
  });

  const [showPatientViewModel, setShowPatientViewModel] = useState({
    visible: false,
    payload: null,
  });

  useEffect(() => {
    fetchPatientsData();
  }, []);

  // DONE
  const fetchPatientsData = () => {
    fetch(FETCH_PATIENT_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setPatientList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DONE
  const onAddPatientSubmit = (body) => {
    body.patientAge = +body.patientAge;
    body.patientMobile = +body.patientMobile;
    body.patientDOB = moment(Date.parse(body.patientDOB)).format("DD-MM-YYYY");

    fetch(ADD_PATIENT_ENDPOINT, {
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
        setAddPatient(false);
        fetchPatientsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
  const onUpdatePatientSubmit = (body) => {
    body.patientAge = +body.patientAge;
    body.patientMobile = +body.patientMobile;
    body.patientDOB = moment(Date.parse(body.patientDOB)).format("DD-MM-YYYY");

    fetch(UPDATE_PATIENT_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Updated Successfully.`);

        setShowUpdatePatient({
          visible: false,
          payload: null,
        });
        fetchPatientsData();
      })
      .catch((error) => {
        console.log(error);

        alert(`Something wents wroung!`);
      });
  };

  const deletePatient = (test_id) => {
    fetch(`${DELETE_PATIENT_ENDPOINT}/${test_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${test_id} deleted successfully.`);
        fetchPatientsData();
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
            setAddPatient(!addPatient);
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Add Patient</span>
        </button>

        {/* <button
          onClick={(event) => {
            event.preventDefault();

            if (showUpdatePatient.visible) {
              return;
            }

            let data = prompt(`Enter Test's id`);
            if (!data) {
              alert("patient id can not be empty.");
              return;
            }
            data = +data;

            const filterd = patientList.filter((item) => item.testId === data);
            if (filterd.length) {
              setShowUpdatePatient({
                payload: filterd[0],
                visible: !showUpdatePatient.visible,
              });
            } else {
              alert("Test id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Update Patient</span>
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

            const filterd = patientList.filter((item) => item.testId === data);
            if (filterd.length) {
              deletePatient(data);
            } else {
              alert("test id not found.");
            }
          }}
          className="flex items-center h-10 gap-1 text-white bg-red-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-red-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Delete Patient</span>
        </button> */}
      </div>

      {addPatient ? <AddPatientForm onFormSubmit={onAddPatientSubmit} /> : null}

      {showUpdatePatient.visible ? (
        <UpdatePatientForm
          onFormSubmit={onUpdatePatientSubmit}
          payload={showUpdatePatient.payload}
        />
      ) : null}

      {showPatientViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg">
          <div className="mt-12 flex flex-col items-start gap-2 ">
            {Object.keys(showPatientViewModel.payload).map((key) => (
              <h3 className="text-xl">
                <strong>{key}:</strong> {showPatientViewModel.payload[key]}
              </h3>
            ))}

            <button
              onClick={(event) => {
                event.preventDefault();

                setShowPatientViewModel({
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
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              DOB
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
              Age
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
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {patientList.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b hover:bg-gray-200 cursor-pointer"
            >
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientName}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientUserName}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientEmail}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientDOB}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientMobile}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientAge}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.patientPassword}
              </td>

              <td className="flex gap-1 justify-center text-base text-gray-900 font-normal px-0 py-4 whitespace-nowrap">
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    setShowUpdatePatient({
                      payload: item,
                      visible: !showUpdatePatient.visible,
                    });
                  }}
                  className="text-white bg-green-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-green-500"
                >
                  update
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deletePatient(item.patientId);
                  }}
                  className="text-white bg-red-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-red-500"
                >
                  delete
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    console.log(item);

                    setShowPatientViewModel({
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
