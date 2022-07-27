import { useState, useEffect } from 'react';
import { UserIcon } from '../../components/SVGIcons';
import {
  FETCH_DOCTORS_LIST_ENDPOINT,
  ADD_DOCTORS_ENDPOINT,
  UPDATE_DOCTORS_ENDPOINT,
  DELETE_DOCTORS_ENDPOINT,
} from '../../utils/constants';

import AddDoctorForm from '../../components/AddDoctorForm';

export default function Settings(props) {
  const [addDoctor, setAddDoctor] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    //NOTE: use it when backend is running
    // fetch(FETCH_DOCTORS_LIST_ENDPOINT, {
    //   method: 'GET',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setDoctorsList(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const onAddDoctorSubmit = (addDoctorData) => {
    console.log(addDoctorData);

    // fetch(ADD_DOCTORS_ENDPOINT, {
    //   method: 'POST',
    //   body: JSON.stringify(addDoctorData)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setAddDoctor(false);
  };

  const updateDoctorSubmit = (updateDoctorData) => {
    console.log(updateDoctorData);

    // fetch(UPDATE_DOCTORS_ENDPOINT, {
    //   method: 'POST',
    //   body: JSON.stringify(addDoctorData)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setAddDoctor(false);
  };

  const deleteDoctor = (doctor_id) => {
    console.log(doctor_id);

    // fetch(`${DELETE_DOCTORS_ENDPOINT}/${doctor_id}`, {
    //   method: 'GET',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <button
        onClick={(event) => {
          event.preventDefault();
          setAddDoctor(!addDoctor);
        }}
        className="flex items-center self-end h-10 gap-2 w-44 text-white bg-blue-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-500"
      >
        <UserIcon className="w-5 h-5 fill-white" />
        <span className="uppercase font-semibold">Add Doctor</span>
      </button>

      {addDoctor ? (
        <div>
          <AddDoctorForm onFormSubmit={onAddDoctorSubmit} />
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {doctorsList.map((item, i) => (
            <tr className="bg-white border-b">
              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                Otto
              </td>
              <td className="flex gap-1 justify-center text-sm text-gray-900 font-light px-0 py-4 whitespace-nowrap">
                <button className="text-white bg-green-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-green-500">
                  update
                </button>
                <button className="text-white bg-red-600 px-1 rounded-lg capitalize hover:shadow-lg hover:bg-red-500">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
