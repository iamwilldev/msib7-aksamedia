import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "./Navbar";

const DefaultLayout = () => {
  const { user, token } = useStateContext();
  const location = useLocation();
  const renderOutlet = location.pathname !== "/";
  const renderHome = location.pathname === "/";
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      {renderHome && (
        <div>
          <div className="max-w-7xl mx-auto mb-10">
            <div className="mx-auto justify-center w-5/6">
              <div className="">
                <h1 className="text-5xl text-gray-700 text-center">WELCOME</h1>
                <div className="mt-4 text-center">
                  <h1 className="text-2xl text-gray-700 mt-4">
                    LOGIN INFORMATION:
                  </h1>
                  <p>
                    <span className="font-bold">Username:</span> admin
                  </p>
                  <p>
                    <span className="font-bold">Password:</span> pastibisa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {renderOutlet && <Outlet />}
    </div>
  );
};

export default DefaultLayout;
