import { useForm } from "react-hook-form";
import {
  ErrorIcon,
  ScopeIcon,
  ClockIcon,
  MobileIcon,
} from "../components/SVGIcons";

export default function AddAppointmentForm(props) {
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
      type: "date",
      field: "dateOfAppointment",
      placeholder: "Appointment Date",
      icon: <ClockIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("dateOfAppointment", {
          required: "Appointment Date is Required",
        }),
      },
    },
    {
      type: "time",
      field: "timeOfAppointment",
      placeholder: "Appointment Time",
      icon: <ClockIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("timeOfAppointment", {
          required: "Appointment Time is Required",
        }),
      },
    },
    {
      type: "text",
      field: "consultationFee",
      placeholder: "Fees",
      icon: <MobileIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register("consultationFee", {
          required: "Fees is Required",
          pattern: {
            value: /^[0-9.]+$/,
            message: "Invalid Fees",
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
        Add appointment
      </button>
    </form>
  );
}
