import { useState, useEffect } from "react";
import { UserIcon, EyesIcon } from "../../components/SVGIcons";
import {
  FETCH_TEST_LIST_ENDPOINT,
  ADD_TEST_ENDPOINT,
  UPDATE_TEST_ENDPOINT,
  DELETE_TEST_ENDPOINT,
} from "../../utils/constants";

import AddTestForm from "../../components/AddTestForm";
import UpdateTestForm from "../../components/UpdateTestForm";
import { current } from "@reduxjs/toolkit";

export default function Settings(props) {
  const [testList, setTestList] = useState([]);
  const [addTest, setAddTest] = useState(false);
  const [showUpdateTest, setShowUpdateTest] = useState({
    visible: false,
    payload: null,
  });

  const [showTestViewModel, setShowTestViewModel] = useState({
    visible: false,
    payload: null,
  });

  useEffect(() => {
    fetchTestsData();
  }, []);

  // "testId": 12,
  //       "testName": "cdeghggh",
  //       "testType": "rrhghghghghg",
  //       "testDescription": "yyyghghgh",
  //       "testCost": 1000002.6

  // DONE
  const fetchTestsData = () => {
    fetch(FETCH_TEST_LIST_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTestList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DONE
  const onAddTestSubmit = (body) => {
    fetch(ADD_TEST_ENDPOINT, {
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
        setAddTest(false);
        fetchTestsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  // DONE
  const onUpdateTestSubmit = (body) => {
    fetch(UPDATE_TEST_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Updated Successfully.`);

        setShowUpdateTest({
          visible: false,
          payload: null,
        });
        fetchTestsData();
      })
      .catch((error) => {
        alert(`Something wents wroung!`);
      });
  };

  const deleteTest = (test_id) => {
    fetch(`${DELETE_TEST_ENDPOINT}/${test_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${test_id} deleted successfully.`);
        fetchTestsData();
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
            setAddTest(!addTest);
          }}
          className="flex items-center h-10 gap-1 text-white bg-green-400 px-4 py-1 rounded-xl shadow-sm hover:shadow-lg hover:bg-green-500"
        >
          <UserIcon className="w-5 h-5 fill-white" />
          <span className="uppercase font-semibold">Add Test</span>
        </button>

        <button
          onClick={(event) => {
            event.preventDefault();

            if (showUpdateTest.visible) {
              return;
            }

            let data = prompt(`Enter Test's id`);
            if (!data) {
              alert("Test id can not be empty.");
              return;
            }
            data = +data;

            const filterd = testList.filter((item) => item.testId === data);
            if (filterd.length) {
              setShowUpdateTest({
                payload: filterd[0],
                visible: !showUpdateTest.visible,
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

            const filterd = testList.filter((item) => item.testId === data);
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

      {addTest ? <AddTestForm onFormSubmit={onAddTestSubmit} /> : null}

      {showUpdateTest.visible ? (
        <UpdateTestForm
          onFormSubmit={onUpdateTestSubmit}
          payload={showUpdateTest.payload}
        />
      ) : null}

      {showTestViewModel.visible ? (
        <div className="my-12 flex flex-col items-center bg-gray-200 rounded-lg shadow-lg">
          <div className="mt-12 flex flex-col items-start gap-2 ">
            {Object.keys(showTestViewModel.payload).map((key) => (
              <h3 className="text-xl">
                <strong>{key}:</strong> {showTestViewModel.payload[key]}
              </h3>
            ))}

            <button
              onClick={(event) => {
                event.preventDefault();

                setShowTestViewModel({
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
              Type
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Description
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-3 py-4"
            >
              Cost
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
          {testList.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-1 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                {item.testId}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.testName}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.testType}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.testDescription}
              </td>
              <td className="text-base text-gray-900 font-normal px-1 py-4 whitespace-nowrap">
                {item.testCost}
              </td>

              <td className="flex gap-1 justify-center text-base text-gray-900 font-normal px-0 py-4 whitespace-nowrap">
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    setShowUpdateTest({
                      payload: item,
                      visible: !showUpdateTest.visible,
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

                    setShowTestViewModel({
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
