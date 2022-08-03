import { useForm } from "react-hook-form";
import { ErrorIcon, ScopeIcon, MobileIcon } from "../components/SVGIcons";

export default function AddAdminForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
    props.onFormSubmit(formData);
  };

  const buildForm = [
    {
      type: "text",
      field: "testName",
      placeholder: "Test Name",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("testName", {
          required: "Test Name is Required",
          pattern: {
            value: /^[a-z ,.'-]+$/i,
            message: "Invalid Name",
          },
          maxLength: {
            value: 14,
            message: "Test Name no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Test Name can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "testType",
      placeholder: "Test Type ",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("testType", {
          required: "Test Type is Required",
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: "Invalid Test Type",
          },
          maxLength: {
            value: 14,
            message: "Test Type no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Test Type can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "testDescription",
      placeholder: "Description",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("testDescription", {
          required: "Descriptionr is Required",
          pattern: {
            value: /^[0-9a-z ,.'-]+$/i,
            message: "Invalid Descriptionr",
          },
        }),
      },
    },
    {
      type: "text",
      field: "testCost",
      placeholder: "Cost",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("testCost", {
          required: "Cost is Required",
          pattern: {
            value: /^[0-9.]+$/,
            message: "Invalid Cost",
          },
        }),
      },
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      required
      className="mt-6 flex flex-col items-center gap-3"
    >
      {buildForm.map((item, i) => (
        <div key={i} className="flex flex-col">
          <div className="w-80 flex items-center gap-3 border-2 hover:border-gray-400 bg-gray-200 rounded-full px-3 py-2">
            {item.icon}
            <input
              type={item.type}
              className="focus:outline-none bg-gray-200 "
              placeholder={item.placeholder}
              {...item.validation}
              onKeyUp={() => {
                trigger(item.field);
              }}
            />
          </div>
          {errors[item.field] && (
            <p className="ml-7 flex items-center gap-2 text-red-400">
              <ErrorIcon className="h-4 w-4 fill-red-500" />
              {errors[item.field].message}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-6 mb-24 px-4 py-2 bg-red-600 rounded-full w-60 text-white uppercase font-semibold hover:shadow-xl"
      >
        Add Test
      </button>
    </form>
  );
}
