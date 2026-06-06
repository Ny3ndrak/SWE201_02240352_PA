import { useState } from 'react';

// Custom hook — manages form values and validation
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setValue = (key, val) =>
    setValues((v) => ({ ...v, [key]: val }));

  const validate = (rules) => {
    const errs = {};
    for (const [key, rule] of Object.entries(rules)) {
      if (rule.required && !values[key]?.toString().trim()) {
        errs[key] = `${key} is required`;
      }
      if (rule.min && values[key]?.length < rule.min) {
        errs[key] = `Minimum ${rule.min} characters`;
      }
      if (rule.max && values[key]?.length > rule.max) {
        errs[key] = `Maximum ${rule.max} characters`;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValue, validate, reset };
}