import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
  methods: ReturnType<typeof useForm<T>>;
  onSubmit: SubmitHandler<T>;
  onError?: (errors: any) => void; // Optional onError prop
  children: React.ReactNode;
  className?: string;
}

const FormWrapper = <T extends FieldValues>({
  methods,
  onSubmit,
  children,
  className,
  onError,
}: FormWrapperProps<T>) => {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className={`${className} w-full rounded p-5 border shadow`}
        onSubmit={handleSubmit(onSubmit, onError)}
        autoComplete="off"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
