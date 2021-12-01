import { useCallback, useState } from "react";


function useFormWithValidation(inputs) {
  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity())
  }

  const resetForm = useCallback(
    (newData = {}, newErrors = {}, newIsValid = false) => {
      setValues(newData);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm };
}

export default useFormWithValidation;