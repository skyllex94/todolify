import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUserId } from "../redux/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    dispatch(removeUserId());
    if (window.location.pathname === "/") window.location.reload(false);
    navigate("/");
  };

  return { logoutUser };
}
