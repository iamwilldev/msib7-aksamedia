import React, { useEffect, useState } from "react";
import { axiosClient1 } from "../axiosClient";
import { faker } from "https://esm.sh/@faker-js/faker";

const Task2 = () => {
  const [resLogin, setResLogin] = useState([]);
  const [resDivisions, setResDivisions] = useState([]);
  const [resDivisionsFilter, setResDivisionsFilter] = useState([]);
  const [resEmployees, setResEmployees] = useState([]);
  const [resEmployeesFilter, setResEmployeesFilter] = useState([]);
  const [resCreateEmployee, setResCreateEmployee] = useState([]);
  const [resUpdateEmployee, setResUpdateEmployee] = useState([]);
  const [resDeleteEmployee, setResDeleteEmployee] = useState([]);
  const [employeeDump, setEmployeeDump] = useState({
    name: faker.person.fullName(),
    phone: faker.string.numeric(15),
    position: faker.person.jobTitle(),
    image: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    // LOGIN
    axiosClient1
      .post("/login", {
        username: "admin",
        password: "pastibisa",
      })
      .then(({ data }) => {
        setResLogin(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // GET ALL DATA DIVISIONS
    axiosClient1
      .get("/divisions")
      .then(({ data }) => {
        setResDivisions(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // GET FILTER DATA DIVISIONS
    axiosClient1
      .get("/divisions", {
        params: {
          name: "Full Stack",
        },
      })
      .then(({ data }) => {
        setResDivisionsFilter(data);
        setEmployeeDump({
          ...employeeDump,
          division_id: data.data[0].id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // GET ALL DATA EMPLOYEES
    axiosClient1
      .get("/employees")
      .then(({ data }) => {
        setResEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // GET FILTER DATA EMPLOYEES
    axiosClient1
      .get("/employees", {
        params: {
          name: "kucing",
          division_id: "",
        },
      })
      .then(({ data }) => {
        setResEmployeesFilter(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (employeeDump.division_id && employeeDump.division_id !== "") {
      // CREATE DATA EMPLOYEES
      axiosClient1
        .post("/employees", {
          name: employeeDump.name,
          phone: employeeDump.phone,
          position: employeeDump.position,
          division_id: employeeDump.division_id,
          image: employeeDump.image,
        })
        .then(({ data }) => {
          setResCreateEmployee(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [employeeDump]);

  useEffect(() => {
    if (resCreateEmployee.data && resCreateEmployee.data.id) {
      // UPDATE DATA EMPLOYEES
      axiosClient1
        .put(`/employees/${resCreateEmployee.data.id}`, {
          name: "new Name",
          phone: employeeDump.phone,
          position: employeeDump.position,
          division_id: employeeDump.division_id,
          image: employeeDump.image,
        })
        .then(({ data }) => {
          setResUpdateEmployee(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [resCreateEmployee]);

  useEffect(() => {
    if (resCreateEmployee.data && resCreateEmployee.data.id) {
      // DELETE DATA EMPLOYEES
      axiosClient1
        .delete(`/employees/${resCreateEmployee.data.id}`)
        .then(({ data }) => {
          setResDeleteEmployee(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [resCreateEmployee]);
  return (
    <div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="mx-auto justify-center w-5/6">
          <div className="">
            <h1 className="text-5xl text-gray-700 text-center">TASK 2</h1>
          </div>
          <div className="mb-[100px]">
            <h1 className="text-2xl text-gray-700 mt-4">
              1. Tugas 1 <b>Membuat Api Login</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`POST ${axiosClient1.defaults.baseURL}/api/login`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Expected Request Format</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        username: "admin",
                        password: "pastibisa",
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resLogin, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              2. Tugas 2 <b>Membuat Api Get All Data Divisi</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`GET ${axiosClient1.defaults.baseURL}/api/divisions`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Expected Request Format</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        name: "Full Stack",
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response Get All Data</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resDivisions, null, 2)}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response Get Filter Data</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resDivisionsFilter, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              3. Tugas 3 <b>Membuat Api Get All Data Karyawan</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`GET ${axiosClient1.defaults.baseURL}/api/employees`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Expected Request Format</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        name: "kucing",
                        division_id: "",
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response Get All Data</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resEmployees, null, 2)}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response Get Filter Data</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resEmployeesFilter, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              4. Tugas 4 <b>Membuat Api Create Data Karyawan</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`POST ${axiosClient1.defaults.baseURL}/api/employees`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Expected Request Format</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        name: employeeDump.name,
                        phone: employeeDump.phone,
                        position: employeeDump.position,
                        division: employeeDump.division_id,
                        image: employeeDump.image,
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resCreateEmployee, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              5. Tugas 5 <b>Membuat Api Update Data Karyawan</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`PUT ${axiosClient1.defaults.baseURL}/api/employees/{uuid}`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Expected Request Format</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        name: "new Name",
                        phone: employeeDump.phone,
                        position: employeeDump.position,
                        division: employeeDump.division_id,
                        image: employeeDump.image,
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resUpdateEmployee, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              6. Tugas 6 <b>Membuat Api Delete Data Karyawan</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`DELETE ${axiosClient1.defaults.baseURL}/api/employees/{uuid}`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(resDeleteEmployee, null, 2)}
                  </code>
                </pre>
              </li>
            </ul>
            <h1 className="text-2xl text-gray-700 mt-4">
              7. Tugas 7 <b>Membuat Api Logout</b>
            </h1>
            <ul className="ml-10">
              <li>
                <label htmlFor="">Acces API</label>
                <pre className="bg-gray-100 p-2 rounded-md overflow-auto">
                  <code className="text-gray-700">{`GET ${axiosClient1.defaults.baseURL}/api/logout`}</code>
                </pre>
              </li>
              <li>
                <label htmlFor="">Response</label>
                <pre className="bg-gray-100 p-2 rounded-md max-h-64 overflow-auto">
                  <code className="text-gray-700">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "Successfully logged out",
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task2;
