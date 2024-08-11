import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient1 } from "../axiosClient";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (id) {
      // Fetch user data by id
      axiosClient1
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser({
            id: data.data.user.id,
            name: data.data.user.name,
            username: data.data.user.username,
            email: data.data.user.email,
            phone: data.data.user.phone,
            password: data.data.user.password,
          });
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    axiosClient1
      .put(`/users/${user.id}`, user)
      .then(() => {
        navigate(`/user/${user.id}`);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl text-gray-700 text-center">
              {user.id ? `Update Profile: ${user.name}` : "Add New Profile"}
            </h1>
          </div>
          <div className="card overflow-x-auto w-auto">
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center">{error}</div>}
            {!loading && !error && (
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4 mt-6 w-80 mx-auto">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={(ev) =>
                      setUser({ ...user, name: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    readOnly
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(ev) =>
                      setUser({ ...user, email: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={(ev) =>
                      setUser({ ...user, phone: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={(ev) =>
                      setUser({ ...user, password: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    {user.id ? "Update" : "Save"}
                  </button>
                  {/* <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={employees.image}
                    onChange={(ev) =>
                      setEmployees({ ...employees, image: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={employees.name}
                    onChange={(ev) =>
                      setEmployees({ ...employees, name: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={employees.phone}
                    onChange={(ev) =>
                      setEmployees({ ...employees, phone: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <label htmlFor="division">Division</label>
                  <select
                    name="division_id"
                    id="division"
                    value={
                      employees.division_id !== null
                        ? employees.division_id
                        : ""
                    }
                    onChange={(ev) =>
                      setEmployees({
                        ...employees,
                        division_id: ev.target.value,
                      })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">Select Division</option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={employees.position}
                    onChange={(ev) =>
                      setEmployees({ ...employees, position: ev.target.value })
                    }
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    {employees.id ? "Update" : "Save"}
                  </button> */}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
