import { useState } from "react";

export function useRequiredFieldsValidation(
  initialValues,
  requiredFields,
  fieldRules = {}
) {
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

  function hasFieldRuleError(field) {
    const rule = fieldRules[field];
    if (!rule) return false;
    return !rule(formValues[field]);
  }

  function isFieldInvalid(field) {
    return (
      touchedValidation[field] &&
      (isFieldEmpty(field) || hasFieldRuleError(field))
    );
  }

  function isFieldValid(field) {
    return (
      touchedValidation[field] &&
      !isFieldEmpty(field) &&
      !hasFieldRuleError(field)
    );
  }

  const isFormValid = requiredFields.every(
    (field) => !isFieldEmpty(field) && !hasFieldRuleError(field)
  );

  return {
    formValues,
    setFormValues,
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFieldValid,
    isFormValid,
  };
}
