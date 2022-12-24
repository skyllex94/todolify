import { useState } from "react";

export function useFormData() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (event, keyName) =>
    setFormData({ ...formData, [keyName]: event.target.value });

  return { formData, onChange };
}
