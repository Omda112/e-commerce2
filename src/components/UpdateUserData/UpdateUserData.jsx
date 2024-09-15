/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [apiSuccess, setApiSuccess] = useState(null);
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required('Required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
  });

  const myForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setApiError(null);
      setApiSuccess(null);
      setIsLoading(true);

      axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        .then((res) => {
          let { data } = res;
          console.log(data);
          navigate('/login');
          setIsLoading(false);
        })
        .catch((error) => {
          setApiError(error.response?.data?.message || 'An error occurred');
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      {apiError && (
        <div className="max-w-lg mx-auto mt-5 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>
      )}

      {apiSuccess && (
        <div className="max-w-lg mx-auto mt-5 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">{apiSuccess}</span>
        </div>
      )}

      <form onSubmit={myForm.handleSubmit} className="max-w-lg mx-auto mt-5">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            name="email"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
          {myForm.errors.email && myForm.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{myForm.errors.email}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.newPassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New Password"
          />
          {myForm.errors.newPassword && myForm.touched.newPassword ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{myForm.errors.newPassword}</span>
            </div>
          ) : null}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Submit'}
        </button>
      </form>
    </>
  );
}
