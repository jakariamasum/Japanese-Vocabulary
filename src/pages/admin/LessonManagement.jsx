import { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/ui/Button";
import UXForm from "../../components/form/UXForm";
import UXInput from "../../components/form/UXInput";
import axiosPublic from "../../lib/axiosPublic";
import { toast } from "sonner";

const LessonManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axiosPublic.get("/api/lessons");
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Failed to load lessons. Please try again.");
    }
  };

  const openModal = (lesson = null) => {
    setIsModalOpen(true);
    if (lesson) {
      setEditingLesson(lesson);
    } else {
      setEditingLesson(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
  };

  const onSubmit = async (data) => {
    try {
      const url = editingLesson
        ? `/api/lessons/${editingLesson._id}`
        : "/api/lessons";
      editingLesson
        ? await axiosPublic.put(url, data)
        : await axiosPublic.post(url, data);
      fetchLessons();
      closeModal();
      toast.success(
        editingLesson
          ? "Lesson updated successfully"
          : "Lesson created successfully"
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (lessonId) => {
    try {
      await axiosPublic.delete(`/api/lessons/${lessonId}`);
      fetchLessons();
      toast.success("Lesson deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openModal()}>Create Lesson</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingLesson ? "Edit Lesson" : "Create New Lesson"}
      >
        <UXForm onSubmit={onSubmit} defaultValues={editingLesson}>
          <div>
            <UXInput
              type="text"
              name="lessonName"
              placeholder="Eneter Lesson name"
              label="Lesson Name"
            />
          </div>
          <div>
            <UXInput
              type="text"
              name="lessonNumber"
              placeholder="Eneter lesson number "
              label="Lesson Number"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="danger" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingLesson ? "Update Lesson" : "Create Lesson"}
            </Button>
          </div>
        </UXForm>
      </Modal>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 bg-gray-50 border-b">
          All Lessons
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lesson Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lesson Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vocabulary Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <tr key={lesson._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{lesson.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.lessonNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.vocabularyCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openModal(lesson)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default LessonManagement;
