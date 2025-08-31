import React from "react";
import { RiChatSmile3Fill } from "react-icons/ri";

const Loading: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 h-full rounded-xl w-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="p-3 w-[50px] h-[50px] lg:w-[50px] lg:h-[50px] flex justify-center items-center rounded-xl bg-black/70 text-3xl animate-spin text-[#7741f4] gap-0.5">
        <RiChatSmile3Fill />
      </div>
    </div>
  );
};

export default Loading;
