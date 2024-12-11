/* eslint-disable react/prop-types */

import { FormProvider, useForm } from "react-hook-form";

const UXForm = ({ children, onSubmit, defaultValues, resolver }) => {
  const formConfig = {};

  if (!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form className="px-6 py-8 space-y-6" onSubmit={submitHandler(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default UXForm;
