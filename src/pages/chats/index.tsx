import React, { useEffect, useState } from "react";
import ChatHeader from "../../components/header";
import useSocketStore, { type User } from "../../store/socketStore";
import useAuthStore from "../../store/authStore";
import ChatList from "./ChatList";
import ChatPage from "./ChatPage";

const Chats: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("");
  const [selectedConversationId, setSelectedConversationId] =
    useState<string>("");
  const [convUser, setConvUser] = useState<User | null>(null);

  const { userData } = useAuthStore();
  const { fetchConversations } = useSocketStore();
  useEffect(() => {
    if (userData) fetchConversations(userData._id);
  }, []);

  return (
    <div className="min-h-screen">
      <ChatHeader />
      <div className="h-[calc(100vh-158px)] md:h-[calc(100vh-108px)] mt-2 overflow-auto border-muted border-t">
        <div className="h-full flex relative">
          <div
            className={`flex-1 border-r border-muted ${
              selectedConversation ? "max-md:hidden" : ""
            }`}
          >
            <ChatList
              setSelectedConversation={setSelectedConversation}
              setSelectedConversationId={setSelectedConversationId}
              setConvUser={setConvUser}
            />
          </div>
          <div
            className={`${
              selectedConversation ? "flex" : "hidden md:flex"
            }  flex-2`}
          >
            <ChatPage
              selectedConversation={selectedConversation}
              selectedConversationId={selectedConversationId}
              setSelectedConversation={setSelectedConversation}
              setSelectedConversationId={setSelectedConversationId}
              convUser={convUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
