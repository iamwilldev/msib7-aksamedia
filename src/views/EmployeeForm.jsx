import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { axiosClient1 } from "../axiosClient";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState({
    id: null,
    image: "",
    name: "",
    phone: "",
    division: "",
    position: "",
  });
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllDivisions = async () => {
    try {
      let allDivisions = [];
      let page = 1;

      while (true) {
        const { data } = await axiosClient1.get(`/divisions?page=${page}`);
        allDivisions = [...allDivisions, ...data.data];
        if (data.pagination.next_page_url) {
          page++;
        } else {
          break;
        }
      }

      //   console.log(allDivisions);
      setDivisions(allDivisions);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);

    // Fetch divisions data for both create and update scenarios
    fetchAllDivisions();

    if (id) {
      // Fetch employee data by id
      axiosClient1
        .get(`/employees/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setEmployees({
            id: data.data.employee.id,
            image: data.data.employee.image,
            name: data.data.employee.name,
            phone: data.data.employee.phone,
            division_id: data.data.employee.division.id,
            position: data.data.employee.position,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (employees.id) {
      axiosClient1
        .put(`/employees/${employees.id}`, employees)
        .then(() => {
          navigate("/task3");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setError(response.data.errors);
          }
        });
    } else {
      axiosClient1
        .post("/employees", employees)
        .then(() => {
          navigate("/task3");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setError(response.data.errors);
          }
        });
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl text-gray-700 text-center">
              {employees.id
                ? `Update Employee: ${employees.name}`
                : "Add New Employee"}
            </h1>
          </div>
          <div className="card overflow-x-auto w-auto">
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center">{error}</div>}
            {!loading && !error && (
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4 mt-6 w-80 mx-auto">
                  <label htmlFor="image">Image</label>
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
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
