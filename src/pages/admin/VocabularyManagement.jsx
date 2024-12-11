import { useState, useEffect } from "react";
import axiosPublic from "../../lib/axiosPublic";
import { toast } from "sonner";
import Modal from "../../components/modal/Modal";
import UXForm from "../../components/form/UXForm";
import UXInput from "../../components/form/UXInput";
import UXSelect from "../../components/form/UXSelect";
import Button from "../../components/ui/Button";

const VocabularyManagement = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [filterLessonNo, setFilterLessonNo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVocabularies();
    fetchLessons();
  }, []);

  const openModal = (lesson = null) => {
    setIsModalOpen(true);
    if (lesson) {
      setEditingVocabulary(lesson);
    } else {
      setEditingVocabulary(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVocabulary(null);
  };

  const fetchVocabularies = async () => {
    try {
      const response = await axiosPublic.get("/vocabularies");
      setVocabularies(response.data);
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
      toast.success("Failed to load vocabularies. Please try again.");
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await axiosPublic.get("/lessons");
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Failed to load lessons. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    try {
      const url = editingVocabulary
        ? `/vocabularies/${editingVocabulary._id}`
        : "/vocabularies";
      editingVocabulary
        ? await axiosPublic.put(url, data)
        : await axiosPublic.post(url, data);
      fetchVocabularies();
      setEditingVocabulary(null);
      toast.success(
        editingVocabulary
          ? "Vocabulary updated successfully"
          : "Vocabulary created successfully"
      );
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (vocabularyId) => {
    try {
      await axiosPublic.delete(`/vocabularies/${vocabularyId}`);
      fetchVocabularies();
      toast.success("Vocabulary deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const filteredVocabularies = filterLessonNo
    ? vocabularies.filter((v) => v.lessonNo.toString() === filterLessonNo)
    : vocabularies;

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openModal()}>Create Vocabulary</Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingVocabulary ? "Edit Vocabulary" : "Create New Vocabulary"}
      >
        <UXForm onSubmit={onSubmit} defaultValues={editingVocabulary}>
          <div>
            <UXInput
              type="text"
              name="word"
              placeholder="Eneter Word "
              label="Word (Japanese)"
            />
          </div>
          <div>
            <UXInput
              type="text"
              name="pronunciation"
              placeholder="Eneter pronunciation "
              label="Pronunciation"
            />
          </div>
          <div>
            <UXInput
              type="text"
              name="meaning"
              placeholder="Eneter meaning "
              label="Meaning"
            />
          </div>
          <div>
            <UXInput
              type="text"
              name="whenToSay"
              placeholder="Eneter when to say "
              label="When To Say"
            />
          </div>
          <div>
            <UXSelect
              label="Select a lesson"
              name="lessonNo"
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
            />
          </div>
          <Button>
            {editingVocabulary ? "Update Vocabulary" : "Create Vocabulary"}
          </Button>
        </UXForm>
      </Modal>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b flex justify-end items-center">
          <div>
            <label
              htmlFor="filterLessonNo"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Filter by Lesson:
            </label>
            <select
              id="filterLessonNo"
              value={filterLessonNo}
              onChange={(e) => setFilterLessonNo(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">All Lessons</option>
              {lessons.map((lesson) => (
                <option key={lesson._id} value={lesson.lessonNumber}>
                  Lesson {lesson.lessonNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Word
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meaning
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pronunciation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  When to Say
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lesson No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVocabularies.map((vocabulary) => (
                <tr key={vocabulary._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vocabulary.word}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vocabulary.meaning}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vocabulary.pronunciation}
                  </td>
                  <td className="px-6 py-4">{vocabulary.whenToSay}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vocabulary.lessonNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button onClick={() => openModal(vocabulary)}>Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(vocabulary._id)}
                    >
                      Delete
                    </Button>
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
export default VocabularyManagement;
