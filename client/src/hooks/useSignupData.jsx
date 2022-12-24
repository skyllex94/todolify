import { useState } from "react";

export function useSignupData() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const onChange = (event, keyName) =>
    setFormData({ ...formData, [keyName]: event.target.value });

  return { formData, onChange };
}
