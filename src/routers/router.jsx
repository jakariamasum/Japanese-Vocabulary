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
import Lessons from "../pages/Lessons";
import LearnLesson from "../pages/LearnLesson";
import AdminDashboard from "../pages/admin/AdminDashboard";

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
      {
        path: "/lessons",
        element: <Lessons />,
      },
      {
        path: "/lessons/:lessonNo",
        element: <LearnLesson />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },

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
