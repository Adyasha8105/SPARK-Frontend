import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { FiFastForward } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

function WaitingListItemButton({ appointmentStatus, onClickFunc ,loading}) {
  let buttonColor;
  let buttonTextColor;
  let buttonBorderColor;
  if (appointmentStatus === "Next") {
    buttonColor = "bg-red-400";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  } else if (appointmentStatus === "Queued") {
    buttonColor = "bg-gray-400";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  } else if (appointmentStatus === "Ongoing") {
    buttonColor = "bg-green-400";
    buttonBorderColor = "border-white";
    buttonTextColor = "text-white";
  }

  return (
    <button
      onClick={() => {
        if (appointmentStatus === "Next") onClickFunc();
      }}
      className={`${buttonColor} ${buttonTextColor} outline-none px-4 py-2 mx-8 flex flex-row space-x-2 items-center border ${buttonBorderColor} rounded-md`}
    >
      <p>{appointmentStatus}</p>
      {loading?(
        <ClipLoader color={"#ffffff"} size={20}/>
      ):
      appointmentStatus === "Ongoing" ? (
        <BsArrowRepeat />
      ) : appointmentStatus === "Next" ? (
        <FiFastForward />
      ) : appointmentStatus === "Queued" ? (
        <BiTimeFive />
      ) : null}
    </button>
  );
}

export default WaitingListItemButton;
