/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { FiFastForward } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

function WaitingListItemButton({
  appointmentStatus,
  onClickFunc,
  PaddingButton,
  isClicked,
  item,
  loading
}) {
  let buttonColor;
  let buttonTextColor;
  let buttonBorderColor;

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, []);

  useEffect(() => {
    if (clicked) {
      if (item) isClicked(item);
      else onClickFunc();
    }
  }, [clicked]);
  if (appointmentStatus === "Next" || appointmentStatus === "Upcoming" || appointmentStatus === "Cancel") {
    buttonColor = "bg-red-400";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  } else if(appointmentStatus ==='cancel'){
    buttonColor = "bg-red-400";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  }
   else if (appointmentStatus === "Queued") {
    buttonColor = "bg-gray-400";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  } else if (appointmentStatus === "Ongoing") {
    buttonColor = "bg-green-400";
    buttonBorderColor = "border-white";
    buttonTextColor = "text-white";
  } else if (appointmentStatus === "New Appointment") {
    buttonColor = "bg-dark";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  } else if (appointmentStatus === "completed") {
    buttonColor = "bg-green-600";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  }
  console.log(loading)
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return (
    <button 
      // disabled={currentUser.type==='patient'}
      onClick={() => {
        if (appointmentStatus === "New Appointment" || appointmentStatus ==="Cancel") setClicked(true);
      }}
      className={`${buttonColor} ${buttonTextColor} ${PaddingButton} md:mt-0 mt-5 outline-none px-4 py-2 flex flex-row justify-center space-x-2 items-center border ${buttonBorderColor} rounded-md`}
    >
      <p>{capitalize(appointmentStatus)}</p>
      {loading && (appointmentStatus ==="New Appointment" || appointmentStatus ==="Cancel" || appointmentStatus ==="Next") ? (
        <ClipLoader color={"#ffffff"} size={20}/>
      ):
      appointmentStatus === "Ongoing" ? (
        <BsArrowRepeat />
      ) : appointmentStatus === "Upcoming" ? (
        <FiFastForward />
      ) : appointmentStatus === "Queued" ? (
        <BiTimeFive />
      ) : null}
    </button>
  );
}

export default WaitingListItemButton;
