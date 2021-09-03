import React from "react";
import DefaultAvatar from "./DefaultAvatar";

const ProfileCard = (props) => {
  const { name, symptoms, profile_dp, bloodgroup, address, phone } = props;
  return (
    <div className="rounded-md bg-blue-50 items-center justify-end mx-auto md:p-8 p-2">
      <div className="mx-24 my-4 z-0">
        {profile_dp ? <img src={profile_dp} alt="" /> : <DefaultAvatar />}
      </div>
      <div>
        <div className="font-bold text-center text-xl mt-2 text-dark">
          {name}
        </div>
        <div className="font-regular text-md text-center mt-1">
          Symptoms: {symptoms}
        </div>
        <div className="font-regular text-xs text-center">
          Blood Group: {bloodgroup}
        </div>
      </div>
      <div className="my-8 text-center text-md">
        <div>
          <span className="font-bold text">Address:</span>
          <span className="ml-2">{address}</span>
        </div>
        <div className="mt-6">
          <span className="font-bold">phone:</span>
          <span className="ml-2">{phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
