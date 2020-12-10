import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const register = (name, email, password) => async (dispatch) => {
  try {
    // request action
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // set content type
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // authorize user
    const { data } = await axios.post(
      "/api/users/register",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // set user details to localstorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // catch error
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
