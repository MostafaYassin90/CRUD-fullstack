import { useState } from "react";
import axios from 'axios';
import { backendUrl } from './../App';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fielError, setFieldError] = useState("");
  const [submitError, setSubmitError] = useState("");


  // onSubmit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setFieldError("Password Must Be At Least 6 Characters");
    }

    const loginDetails = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(backendUrl + "/api/admin/login", loginDetails);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
      setSubmitError(error.response.data.message || error.message);
    }

  };

  return (
    <div className="w-full md:w-[430px]">
      <div className="mb-10 flex flex-col gap-2 text-md border border-gray-400 p-3 rounded-md items-center">
        <p>Email: admin@gmail.com</p>
        <p>Password: 123456</p>
      </div>
      <div className="w-full md:w-[430px] shadow-md border border-gray-600 py-10 px-10  rounded">
        <div>
          <p className="prata-regular font-semibold mb-5 text-2xl">Login</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor='email' className="block text-white mb-1">Email</label>
            <input type="email" id='email' required className="block w-full py-2 px-3 rounded bg-[#fff1] outline-none" onChange={(event) => { setEmail(event.target.value); }} value={email} />
          </div>
          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-white mb-1">Password</label>
            <input type="password" id="password" required className="block w-full py-2 px-3 rounded bg-[#fff1] outline-none" onChange={(event) => { setPassword(event.target.value); }} value={password} />
            {fielError && <p className="mt-2 text-red-700">{fielError}</p>}
          </div>
          {/* Buttom */}
          <button className="mt-5 bg-transparent border border-gray-600 text-white py-2 w-[100%] px-5 rounded transition duration-400 hover:bg-slate-900">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
