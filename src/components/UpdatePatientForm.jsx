import { useForm } from "react-hook-form";
import { ErrorIcon, ScopeIcon, MobileIcon } from "../components/SVGIcons";

export default function UpdateTestForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
    props.onFormSubmit({ patientId: props.payload.patientId, ...formData });
  };

  const buildForm = [
    {
      type: "text",
      field: "patientName",
      placeholder: "Patient Name",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientName,
      validation: {
        ...register("patientName", {
          required: "Patient Name is Required",
          pattern: {
            value: /^[a-z ,.'-]+$/i,
            message: "Invalid Name",
          },
          maxLength: {
            value: 14,
            message: "Patient Name no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Patient Name can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "patientUserName",
      placeholder: "Username ",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientUserName,
      validation: {
        ...register("patientUserName", {
          required: "Username is Required",
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: "Invalid Username",
          },
          maxLength: {
            value: 14,
            message: "Username no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Username can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "email",
      field: "patientEmail",
      placeholder: "Email",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientEmail,
      validation: {
        ...register("patientEmail", {
          required: "Email is Required",
        }),
      },
    },
    {
      type: "date",
      field: "patientDOB",
      placeholder: "DOB",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientDOB,
      validation: {
        ...register("patientDOB", {
          required: "DOB is Required",
        }),
      },
    },
    {
      type: "number",
      field: "patientMobile",
      placeholder: "Mobile",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientMobile,
      validation: {
        ...register("patientMobile", {
          required: "Mobile is Required",
        }),
      },
    },
    {
      type: "number",
      field: "patientAge",
      placeholder: "Age",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientAge,
      validation: {
        ...register("patientAge", {
          required: "Age is Required",
        }),
      },
    },
    {
      type: "Password",
      field: "patientPassword",
      placeholder: "Password",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      value: props.payload.patientPassword,
      validation: {
        ...register("patientPassword", {
          required: "Password is Required",
          pattern: {
            value: /^[0-9a-z ,.'-]+$/i,
            message: "Invalid Password",
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
              defaultValue={item.value}
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
        Update Test
      </button>
    </form>
  );
}
