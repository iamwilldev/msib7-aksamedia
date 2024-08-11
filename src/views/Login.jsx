import React, { useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosClient1 } from "../axiosClient";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient1
      .post("/login", payload)
      .then(({ data }) => {
        // console.log(data.data);
        setUser(data.data.admin.name);
        setToken(data.data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex mx-auto justify-center w-5/6 ">
          <form onSubmit={Submit}>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <div className="flex flex-col gap-4 mt-6 w-80 mx-auto">
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                type="text"
                id="username"
                name="username"
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
