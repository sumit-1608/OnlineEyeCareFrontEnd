import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { UserIcon, PasswordIcon, ErrorIcon } from '../components/SVGIcons';
import AuthFooter from '../components/AuthFooter';

import {
  ADMIN_SIGNUP_ENDPOINT,
  DOCTOR_SIGNUP_ENDPOINT,
  PATIENT_SIGNUP_ENDPOINT,
} from '../utils/constants';

export default function Login() {
  const navigate = useNavigate();

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
    let fetchURL = PATIENT_SIGNUP_ENDPOINT;

    if (formData.role === 'admin') {
      fetchURL = ADMIN_SIGNUP_ENDPOINT;
    } else if (formData.role === 'doctor') {
      fetchURL = DOCTOR_SIGNUP_ENDPOINT;
    }

    //NOTE: use it when backend is running

    // fetch(fetchURL, {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    navigate('/', { replace: true });
  };

  const buildForm = [
    {
      type: 'text',
      field: 'name',
      placeholder: 'Name',
      icon: <UserIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('name', {
          required: 'Name is Required',
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'Invalid Name',
          },
          maxLength: {
            value: 14,
            message: 'Name no longer then 14 character!',
          },
          minLength: {
            value: 6,
            message: 'Name can be minimum 6 character!',
          },
        }),
      },
    },
    {
      type: 'email',
      field: 'email',
      placeholder: 'email',
      icon: <UserIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('email', {
          required: 'email is Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }),
      },
    },
    {
      type: 'text',
      field: 'mobile_number',
      placeholder: 'Number',
      icon: <UserIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('mobile_number', {
          required: 'Mobile Number is Required',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Invalid Mobile Number',
          },
          maxLength: {
            value: 10,
            message: 'Only contains 10 numbers',
          },
          minLength: {
            value: 10,
            message: 'Minimum 10 numbers required',
          },
        }),
      },
    },
    {
      type: 'password',
      field: 'password',
      placeholder: 'password',
      icon: <PasswordIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('password', {
          required: 'Password is Required!',
          maxLength: {
            value: 14,
            message: 'Passward no longer then 14 character!',
          },
          minLength: {
            value: 6,
            message: 'Passward can be minimum 6 character!',
          },
        }),
      },
    },
    {
      type: 'password',
      field: 'confirm_password',
      placeholder: 'Confirm Password',
      icon: <PasswordIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('confirm_password', {
          required: 'Confirm Password is Required!',
          validate: (val) => {
            if (watch('password') !== val) {
              return 'Your passwords do not match';
            }
          },
        }),
      },
    },
    {
      type: 'date',
      field: 'birth_date',
      placeholder: 'Birth Date',
      icon: <PasswordIcon className="h-5 w-5 fill-gray-500" />,
      validation: {
        ...register('birth_date', {
          required: 'Birth Date is Required!',
        }),
      },
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center gap-4 h-full bg-no-repeat  bg-cover bg-center  `}
      style={{
        backgroundImage: `url("/11.jpeg")`,
      }}
    >
      <a href="/">
      <img className="h-28 w-[270px] mt-10" src={`/logo.png`} alt="" />
      </a>
      <h1 className="font-bold text-4xl mt-10">Create an Account</h1>

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

        <div className="flex flex-col">
          <div className="w-80 flex items-center gap-3 border-2 hover:border-gray-400 bg-gray-200 rounded-full px-3 py-2">
            <UserIcon className="h-5 w-5 fill-gray-500" />
            <select
              id="countries"
              className="bg-gray-200 focus:outline-none text-gray-900 text-sm rounded-lg block w-full"
              {...register('gender', {
                required: 'Gender is Required!',
              })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="alian">Alian</option>
            </select>
          </div>

          {errors.gender && (
            <p className="ml-7 flex items-center gap-2 text-red-400">
              <ErrorIcon className="h-4 w-4 fill-red-500" />
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="w-80 flex items-center gap-3 border-2 hover:border-gray-400 bg-gray-200 rounded-full px-3 py-2">
            <UserIcon className="h-5 w-5 fill-gray-500" />
            <select
              id="countries"
              className="bg-gray-200 focus:outline-none text-gray-900 text-sm rounded-lg block w-full"
              {...register('role', {
                required: 'Role is Required!',
              })}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {errors.role && (
            <p className="ml-7 flex items-center gap-2 text-red-400">
              <ErrorIcon className="h-4 w-4 fill-red-500" />
              {errors.role.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-600 rounded-full w-60 text-white uppercase font-semibold hover:shadow-xl"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 flex flex-row gap-6 capitalize text-white">
        <a href="/login" className="hover:text-green-400 font-medium">
          Back To Login
        </a>
      </div>

      <AuthFooter />
    </div>
  );
}
