import React from "react";
import WaitingListItemButton from "./DoctorButton";

function WaitingListItem({
  serialNo,
  time,
  isUser,
  appointmentStatus,
  onClickFunc,
  loading
}) {
  return (
    <div className="grid md:flex flex-row bg-gray-50 rounded-md py-3 items-center">
      <div className="flex flex-row w-full">
        <p className="pl-8 pr-4">{serialNo}</p>
        <p className="pl-4">{time}</p>
      </div>

      <WaitingListItemButton
        PaddingButton="mx-8"
        appointmentStatus={appointmentStatus}
        onClickFunc={onClickFunc}
        loading={loading}
      />
    </div>
  );
}

export default WaitingListItem;
