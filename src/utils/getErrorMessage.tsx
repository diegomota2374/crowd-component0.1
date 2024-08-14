import { FieldErrors } from "react-hook-form";

export const getErrorMessage = (errors: FieldErrors, fieldName: string) => {
  const error = errors[fieldName];
  if (error) {
    if (typeof error.message === "string") {
      return error.message;
    }
    // Add additional checks if `error.message` could be an object or undefined
  }
  return null;
};
