import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
  resetCode: Yup.string()
    .matches(/^\d*$/, 'Reset Code must be numeric') // Ensure input is numeric
    .required('Reset Code is required'),
});

export default function OTP() {


  let navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting Reset Code:', values.resetCode);

        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: values.resetCode });
        console.log('API Response:', response.data);
        if(response.data.status == "Success"){
          navigate('/updateData')
        }
      } catch (error) {
        console.error('API Error:', error.response?.data?.message || error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-10">
      <label className="block mb-2 text-sm font-medium text-gray-900">Enter Reset Code</label>
      <input
        type="text" // Use type="text" for numeric input with validation
        name="resetCode"
        id="resetCode"
        value={formik.values.resetCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter Reset Code"
      />
      {formik.errors.resetCode && formik.touched.resetCode && (
        <div className="text-red-600 text-sm mt-2">{formik.errors.resetCode}</div>
      )}
      <button
        type="submit"
        className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Verify Reset Code
      </button>
    </form>
  );
}
