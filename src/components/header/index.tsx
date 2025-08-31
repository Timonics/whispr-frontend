import React, { useState } from "react";
import Logo from "../logo";
import { Plus } from "lucide-react";

const ChatHeader: React.FC = () => {
  const [startNewConv, setStartNewConv] = useState(false);

  return (
    <>
      <div className="flex flex-col p-1 h-[150px] md:h-[100px]">
        <Logo />
        <div className="flex items-center p-2 flex-wrap md:flex-nowrap gap-4 mt-2">
          <h1 className="font-bold text-2xl font-mono flex-1 lg:flex-2">
            Chats
          </h1>
          <Plus
            size={30}
            className="bg-accent/10 p-1 cursor-pointer rounded-full text-muted-foreground"
            onClick={() => setStartNewConv(true)}
          />
          <input
            placeholder="Search"
            className="max-md:w-full md:flex-1 border border-muted p-1 pl-2 outfit rounded-lg outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>
      {startNewConv && (
        <>
          <div
            className="fixed top-0 w-full inset-0 bg-black/50 z-40 backdrop-blur-xl"
            onClick={() => setStartNewConv(false)}
          />
          <div className=" p-4 z-50 w-[280px] sm:w-[320px] md:w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 flex flex-col items-center gap-4 shadow-2xl shadow-black">
            <h2 className="outfit text-2xl"> Add new User</h2>
            <input
              type="text"
              placeholder="Search user by email"
              className="p-2 rounded-md w-full border outline-none focus:border-primary/50 transition-all duration-200"
              onChange={(e) => e.target.value}
            />
            <button className="bg-primary text-primary-foreground outfit px-4 py-2 rounded-full w-full hover:bg-primary/90 transition-all duration-200 cursor-pointer">
              Search
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChatHeader;
