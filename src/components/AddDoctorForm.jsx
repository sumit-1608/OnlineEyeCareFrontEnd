/*this is adddoctor components where i have written add doctor 
 forms in fornt end table using API
and i m importing react hook from for perfrom validation in doctor table */

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

/*functionname -AddDoctorForm() which have accepts props as parameter
 which are returns react element jsx [forms of the doctor table and i have used
  hooks thing also for validations]  */

export default function AddDoctorForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  /* on onSubmit event will occured and call to formData */

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
    props.onFormSubmit(formData);
  };

  /* here i have performed validation for doctorName field
  doctor name should be aplhabatical only */

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

    /* here i have performed validation for doctorUserName field
  doctor user name should be follow below pattern */

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

    /* here i have performed validation for doctor Mobile Number field
  doctor mobile number should be digits only */

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

    /* here i have performed validation for doctor  email format field
  doctor email should be follow email syntax format only */

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

    /* here i have performed validation for doctor password field
  doctorpassword should be greater than 6 and less than 14 and it will
  follow below pattern structure */

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

    /* here i have performed validation for doctor Address field
  doctor address should be follow below pattern format only */

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

    /* here i have performed validation for doctor consultation time field
  it should be followed below pattern syntax */

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

  /* its retrun table form and i have written code in  html format
 after onSubmit it adding doctor data fields in backend DB
using API */

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
