import { ActionTypes } from "../constants/actionTypes";
import { getAllDoctors } from "../../services/api/index";

export const getAllDoctorsAction = () => {
  return (dispatch) => {
    getAllDoctors()
      .then((result) => {
        const payload = {
          doctors: result,
        };
        dispatch({
          type: ActionTypes.GET_ALL_DOC,
          payload: payload,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };
};
