import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeJWT } from "../redux/authSlice";
import { decodeJWT } from "../utils/functions";

export function useLoginUser({ formData, displayAlert }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Request to server to check if use exists in DB and send token
      const res = await axios.post("/api/user", formData);

      // Take in the jwt returned from post req and set in redux store
      const jwt = dispatch(storeJWT({ jwt: res.data }));
      window.localStorage.setItem("jwt", JSON.stringify(jwt.payload.jwt.token));

      const user = decodeJWT(res.data.token);
      const { id } = user.user;
      navigate(`/user/${id}`);
    } catch (err) {
      displayAlert(err.type, err.message);
    }
  };

  return { onSubmit };
}
