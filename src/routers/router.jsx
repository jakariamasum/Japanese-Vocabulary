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
import PrivateRoute from "../Providers/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <Tutorials />
          </PrivateRoute>
        ),
      },
      {
        path: "/lessons",
        element: (
          <PrivateRoute>
            <Lessons />
          </PrivateRoute>
        ),
      },
      {
        path: "/lessons/:lessonNo",
        element: (
          <PrivateRoute>
            <LearnLesson />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute adminOnly={true}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute adminOnly={true}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "lesson-management",
        element: (
          <PrivateRoute adminOnly={true}>
            <LessonManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "vocabulary-management",
        element: (
          <PrivateRoute adminOnly={true}>
            <VocabularyManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
