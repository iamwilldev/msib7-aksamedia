import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import EmployeeForm from "./views/EmployeeForm";
import Task3 from "./views/Task3";
import UserForm from "./views/UserForm";
import Task4 from "./views/Task4";
import Task2 from "./views/Task2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/task2",
        element: <Task2 />,
      },
      {
        path: "/task3",
        element: <Task3 />,
      },
      {
        path: "/task3/newEmployee",
        element: <EmployeeForm key="EmployeeCreate" />,
      },
      {
        path: "/task3/:id",
        element: <EmployeeForm key="EmployeeUpdate" />,
      },
      {
        path: "/user/:id",
        element: <UserForm key="UserUpdate" />,
      },
      {
        path: "/task4",
        element: <Task4 />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
