import { Link } from "react-router-dom";
import axiosPublic from "../../lib/axiosPublic";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchLessons();
    fetchVocabularies();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get("/users");
      setUsers(response.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get("/lessons");
      setLessons(response.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchVocabularies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get("/vocabularies");
      setVocabularies(response.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const stats = [
    { name: "Total Users", value: users?.length || 0 },
    { name: "Total Lessons", value: lessons?.length || 0 },
    { name: "Total Vocabularies", value: vocabularies?.length || 0 },
    { name: "Active Users", value: users?.length || 0 },
  ];

  const recentUsers = users?.sort((a, b) => b - a)?.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
            <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/lesson-management"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded text-center"
          >
            Add New Lesson
          </Link>
          <Link
            to="/admin/vocabulary-management"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
          >
            Add New Vocabulary
          </Link>
          <Link
            to="/admin/user-management"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-center"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/lesson-management"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center"
          >
            Manage Lessons
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
