import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "../redux/alertSlice";

export function useDisplayAlert() {
  const dispatch = useDispatch();
  const [enableAlert, setEnableAlert] = useState(false);
  const alert = useSelector((state) => state.alerts.alert);

  useEffect(() => {
    if (enableAlert === true) {
      setTimeout(() => setEnableAlert(false), 3000);
    }
  }, [enableAlert]);

  const displayAlert = (type, message, status, error_message) => {
    if (type.includes("AxiosError")) type = "error";
    if (status === 400)
      message = error_message ?? "Invalid user credentials, please try again";
    dispatch(createAlert({ type, message }));
    setEnableAlert(true);
  };

  return { alert, enableAlert, displayAlert };
}
