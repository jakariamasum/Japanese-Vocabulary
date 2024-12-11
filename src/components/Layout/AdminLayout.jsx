import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/lessons"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Manage Lessons
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-lesson"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Add Lesson
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-vocabulary"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Add Vocabulary
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-users"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/lesson-management"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Lesson Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/vocabulary-management"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Vocabulary Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
