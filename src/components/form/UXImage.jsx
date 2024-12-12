/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const UXImage = ({ name, label, required = false, ...props }) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log(previewUrl, isUploading);

  const uploadImage = async (file) => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "jp_academy");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dtfpseh5x/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error?.message || "Upload failed");
      }

      const data = await response.json();
      console.log("Cloudinary Response:", data);

      // Setting secure_url in the form and for preview
      setValue(name, data.secure_url);
      setPreviewUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="mt-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 flex items-center">
        <input
          type="file"
          id={name}
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          required={required}
          {...props}
        />
        <label
          htmlFor={name}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </label>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="ml-4 h-12 w-12 object-cover rounded-full"
          />
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default UXImage;
