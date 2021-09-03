import React from "react";
import { FaUserAlt } from "react-icons/fa";

const DefaultAvatar = () => {
  return (
    <div className="default-avatar rounded-full bg-primary opacity-50 inline-block p-5 z-20">
      <FaUserAlt size={50} color="#EFF6FF" />
    </div>
  );
};

export default DefaultAvatar;
