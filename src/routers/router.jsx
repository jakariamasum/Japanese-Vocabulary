import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../components/Layout/AdminLayout";
import LessonManagement from "../pages/admin/LessonManagement";
import VocabularyManagement from "../pages/admin/VocabularyManagement";
import UserManagement from "../pages/admin/UserManagement";
import Tutorials from "../pages/Tutorials";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "lesson-management",
        element: <LessonManagement />,
      },
      {
        path: "vocabulary-management",
        element: <VocabularyManagement />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
]);
