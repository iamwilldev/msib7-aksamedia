import React, { useEffect, useState } from "react";
import { axiosClient1 } from "../axiosClient";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("currentPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(
    () => localStorage.getItem("search") || ""
  );
  const [divisionId, setDivisionId] = useState(
    () => localStorage.getItem("divisionId") || ""
  );

  const getEmployees = async (page = 1) => {
    setLoading(true);
    try {
      axiosClient1
        .get(`/employees?page=${page}`, {
          params: { name: search, division_id: divisionId },
        })
        .then(({ data }) => {
          setEmployees(data.data.employees);
          setCurrentPage(data.pagination.current_page);
          setTotalPages(data.pagination.last_page);
          localStorage.setItem("currentPage", data.pagination.current_page);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("search", search);
    localStorage.setItem("divisionId", divisionId);
    getEmployees(1);
  };

  const onDeleteClick = (employee) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    axiosClient1.delete(`/employees/${employee.id}`).then(() => {
      getEmployees(currentPage);
    });
  };

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

      setDivisions(allDivisions);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllDivisions();
    getEmployees(currentPage);
  }, [currentPage, search]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setDivisionId(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center lg:items-stretch w-5/6 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl text-gray-700">Data Employees</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-4">
            <form
              onSubmit={onSubmit}
              className="flex flex-col md:flex-row justify-start items-start space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto"
            >
              <input
                type="text"
                name="name"
                id="name"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name"
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 ml-2"
              />
              <select
                name="division_id"
                id="division_id"
                value={divisionId}
                onChange={handleDivisionChange}
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 ml-2"
              >
                <option value="">All Divisions</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded border-solid border-2 border-blue-300 py-1 px-4 hover:bg-blue-700 hover:text-gray-100 ml-2"
              >
                Search
              </button>
            </form>
            <div className="mt-4 lg:mt-0">
              <Link
                to="/task3/newEmployee"
                className="rounded-full border-solid border-2 border-blue-300 py-2 px-4 hover:bg-blue-700 hover:text-gray-100"
              >
                Add new Employee
              </Link>
            </div>
          </div>

          <div className="card overflow-x-auto w-full mt-4">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Division</th>
                  <th>Position</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && (
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="h-12 w-12 rounded-full"
                        />
                      </td>
                      <td>{employee.name}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.division.name}</td>
                      <td>{employee.position}</td>
                      <td>
                        <Link
                          to={`/task3/${employee.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        &nbsp;|&nbsp;
                        <button
                          onClick={(ev) => onDeleteClick(employee)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
