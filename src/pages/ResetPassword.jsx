import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserIcon, PasswordIcon } from '../components/SVGIcons';
import AuthFooter from '../components/AuthFooter';

export default function ResetPassword() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    isOTPsend: false ,

  });

  const onLogin = (event) => {
    event.preventDefault();
    console.log(formData);

    navigate('/login', { replace: true });
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center gap-4`}
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1658594555053-ff7314462869?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
      }}
    >
      <h1 className="font-bold text-4xl">Reset Password</h1>

      <form
        onSubmit={onLogin}
        required
        className="mt-6 flex flex-col items-center gap-3"
      >
        <div className="w-80 flex items-center gap-3 border-2 hover:border-gray-400 bg-gray-200 rounded-full px-3 py-2">
          <UserIcon className="h-5 w-5 fill-gray-500" />
          <input
            type="email"
            className="focus:outline-none bg-gray-200 "
            placeholder={'bakasur@gmail.com'}
            required
            onChange={(event) => {
              event.preventDefault();
              const { value } = event.target;
              formData.email = value.trim().toLowerCase();
              setFormData({ ...formData });
            }}
          />
        </div>

        {formData.isOTPsend ? <div className="w-80 flex items-center gap-3 border-2 hover:border-gray-400 bg-gray-200 rounded-full px-3 py-2">
          <PasswordIcon className="h-5 w-5 fill-gray-500" />
          <input
            type="password"
            className="focus:outline-none bg-gray-200 "
            placeholder={'enter otp'}
            required
            onChange={(event) => {
              event.preventDefault();
              const { value } = event.target;
              formData.password = value.trim().toLowerCase();
              setFormData({ ...formData });
            }}
          />
        </div> : null}

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-600 rounded-full w-60 text-white uppercase font-semibold hover:shadow-xl"
        >
          Reset Password
        </button>
      </form>

      <div className="mt-4 flex flex-row gap-6 capitalize text-white">
        <a href="/login" className="hover:text-green-400 font-medium">
          Back To Login
        </a>

        <span>|</span>
        <a href="/create-account" className="hover:text-green-400 font-medium">
          Create an account
        </a>
      </div>

      <AuthFooter />
    </div>
  );
}
