import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [token, setToken] = useState(window.localStorage.getItem("Token") ? window.localStorage.getItem("Token") : "");

  useEffect(() => {
    if (token === "") {
      return;
    } else {
      window.localStorage.setItem("Token", token);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-950 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="top-right" theme="light" />
      {
        token
          ?
          <>
            <Navbar setToken={setToken} />
            <hr className="h-[1px] w-full border-none bg-gray-700" />
            <Form />
          </>
          :
          <div className="h-screen w-full  flex items-center justify-center">
            <Login setToken={setToken} />
          </div>
      }
    </div>
  );
};

export default App;
