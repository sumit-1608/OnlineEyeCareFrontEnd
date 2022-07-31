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

export default function UpdateDoctorForm(props) {
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
    props.onFormSubmit({ doctorId: props.payload.doctorId, ...formData });
  };

  const buildForm = [
    {
      type: "text",
      field: "doctorName",
      value: props.payload.doctorName,
      placeholder: "Doctor Name",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorName", {
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

      value: props.payload.doctorUsername,
      placeholder: "Doctor Username",
      icon: <ScopeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorUsername", {
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
      value: props.payload.doctorMobile,
      placeholder: "Mobile Number",

      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorMobile", {
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
      value: props.payload.doctorEmail,
      placeholder: "email",

      icon: <MailIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorEmail", {
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

      value: props.payload.doctorPassword,
      placeholder: "password",

      icon: <PasswordIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorPassword", {
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

      value: props.payload.doctorAddress,
      placeholder: "Address",
      icon: <HomeIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorAddress", {}),
      },
    },
    {
      type: "time",
      field: "doctorConsultationTime",
      value: props.payload.doctorConsultationTime,

      placeholder: "Consultation Time",
      icon: <ClockIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("doctorConsultationTime", {}),
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
              placeholder={item.value.length ? item.value : item.placeholder}
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
        Update Doctor
      </button>
    </form>
  );
}
