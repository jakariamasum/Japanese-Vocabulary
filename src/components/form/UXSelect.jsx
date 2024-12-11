/* eslint-disable react/prop-types */

import { useFormContext } from "react-hook-form";

const UXSelect = ({ label, name, options, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
      <select
        {...register(name)}
        id={name}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default UXSelect;
