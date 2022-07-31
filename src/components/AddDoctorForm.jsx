import { useForm } from "react-hook-form";
import {
  UserIcon,
  PasswordIcon,
  ErrorIcon,
  ScopeIcon,
  MobileIcon,
  MailIcon,
  HomeIcon,
  ClockIcon,
} from "../components/SVGIcons";

export default function AddDoctorForm(props) {
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
      field: "doctorName",
      placeholder: "Doctor Name",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorName", {
          required: "Doctor Name is Required",
          pattern: {
            value: /^[a-z ,.'-]+$/i,
            message: "Invalid Name",
          },
          maxLength: {
            value: 14,
            message: "Doctor Name no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Doctor Name can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "doctorUsername",
      placeholder: "Doctor user Name",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorUsername", {
          required: "Doctor user Name is Required",
          pattern: {
            value: /^[A-Za-z0-9_]+$/,
            message: "Invalid Name",
          },
          maxLength: {
            value: 14,
            message: "Doctor userName no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Doctor user Name can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "doctorMobile",
      placeholder: "Number",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorMobile", {
          required: "Mobile Number is Required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Invalid Mobile Number",
          },
          maxLength: {
            value: 10,
            message: "Only contains 10 numbers",
          },
          minLength: {
            value: 10,
            message: "Minimum 10 numbers required",
          },
        }),
      },
    },
    {
      type: "email",
      field: "doctorEmail",
      placeholder: "email",
      icon: <MailIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorEmail", {
          required: "email is Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }),
      },
    },
    {
      type: "password",
      field: "doctorPassword",
      placeholder: "password",
      icon: <PasswordIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorPassword", {
          required: "Password is Required!",
          maxLength: {
            value: 14,
            message: "Passward no longer then 14 character!",
          },
          minLength: {
            value: 6,
            message: "Passward can be minimum 6 character!",
          },
        }),
      },
    },
    {
      type: "text",
      field: "doctorAddress",
      placeholder: "Address",
      icon: <HomeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorAddress", {
          required: "Address is Required",
        }),
      },
    },
    {
      type: "time",
      field: "doctorConsultationTime",
      placeholder: "Consultation Time",
      icon: <ClockIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorConsultationTime", {
          required: "Consultation Time is Required",
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
        Add Doctor
      </button>
    </form>
  );
}
