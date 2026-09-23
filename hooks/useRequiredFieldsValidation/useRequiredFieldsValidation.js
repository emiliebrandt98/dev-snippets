import { useState } from "react";

export function useRequiredFieldsValidation(initialValues, requiredFields) {
  const [formValues, setFormValues] = useState(initialValues);
  const [touchedValidation, setTouchedValidation] = useState(
    Object.fromEntries(requiredFields.map((field) => [field, false]))
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlurValidation(field) {
    setTouchedValidation((prev) => ({ ...prev, [field]: true }));
  }

  function touchAllFields() {
    setTouchedValidation(
      Object.fromEntries(requiredFields.map((field) => [field, true]))
    );
  }

  function isFieldEmpty(field) {
    return formValues[field]?.toString().trim() === "";
  }

  function isFieldInvalid(field) {
    return touchedValidation[field] && isFieldEmpty(field);
  }

  function isFieldValid(field) {
    return touchedValidation[field] && !isFieldEmpty(field);
  }

  const isFormVaild = requiredFields.every((field) => !isFieldEmpty(field));

  return {
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFieldValid,
    isFormVaild,
  };
}
