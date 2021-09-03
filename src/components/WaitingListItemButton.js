/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { FiFastForward } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";

function WaitingListItemButton({
  appointmentStatus,
  onClickFunc,
  PaddingButton,
  isClicked,
  item,
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
  } else if (appointmentStatus === "New Appointment") {
    buttonColor = "bg-dark";
    buttonTextColor = "text-white";
    buttonBorderColor = "border-white";
  }

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  return (
    <button
      onClick={() => {
        if (appointmentStatus === "New Appointment") setClicked(true);
      }}
      className={`${buttonColor} ${buttonTextColor} ${PaddingButton} md:mt-0 mt-5 outline-none px-4 py-2 flex flex-row justify-center space-x-2 items-center border ${buttonBorderColor} rounded-md`}
    >
      <p>{capitalize(appointmentStatus)}</p>
      {appointmentStatus === "Ongoing" ? (
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
