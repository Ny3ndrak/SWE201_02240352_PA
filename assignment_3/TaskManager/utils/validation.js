import { isValidEmail } from './helpers';

// Validation rules
export const validationRules = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (value && !isValidEmail(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  match: (fieldName, otherValue) => (value) => {
    if (value !== otherValue) {
      return `${fieldName} does not match`;
    }
    return null;
  },
};

// Validate a single field
export const validateField = (value, rules) => {
  if (!rules) return null;

  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

// Validate multiple fields
export const validateFields = (values, fieldRules) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(fieldRules)) {
    const error = validateField(values[field], rules);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};
