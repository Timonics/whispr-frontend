import React from "react";
import useSocketStore, { type User } from "../../store/socketStore";
import { RiChatSmile3Fill } from "react-icons/ri";
import useAuthStore from "../../store/authStore";

type ChatListProps = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<string>>;
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string>>;
  setConvUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const ChatList: React.FC<ChatListProps> = ({
  setSelectedConversation,
  setSelectedConversationId,
  setConvUser,
}) => {
  const { userData } = useAuthStore();
  const { conversations, onlineUsers } = useSocketStore();

  return (
    <div className="p-4 relative h-full ">
      {conversations.length ? (
        <div className="flex flex-col gap-4">
          {conversations.map((conv) => {
            const convUser = conv.participants.filter(
              (user) => user._id !== userData?._id
            )[0];

            const isUserOnline = onlineUsers.some(
              (user) => user._id === convUser._id
            );
            return (
              <div
                key={conv._id}
                className="relative border border-muted p-4 rounded-lg flex flex-col cursor-pointer hover:ring-1 ring-primary/50 transition-all duration-200"
                onClick={() => {
                  setSelectedConversation(convUser._id);
                  setSelectedConversationId(conv._id);
                  setConvUser(convUser);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative">
                    {convUser.avatar ? (
                      <img src={convUser.avatar || "/placeholder.svg"} />
                    ) : (
                      <div className="bg-primary absolute w-full h-full rounded-full flex items-center justify-center text-xl outfit text-primary-foreground">
                        {convUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    {isUserOnline && (
                      <div className="rounded-full w-3 h-3 bg-green-400 absolute bottom-0 right-0" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold outfit ">{convUser.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {conv.last_message
                        ? conv.last_message.text.length > 10
                          ? conv.last_message.text.substring(0, 10) + "..."
                          : conv.last_message.text
                        : "No messages yet. Say hi!"}
                    </p>
                  </div>
                </div>
                <p className="absolute right-0 bottom-4 mr-4 text-muted-foreground text-[10px]">
                  {isUserOnline ? "Online" : "Offline"}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <RiChatSmile3Fill size={30} className="text-primary" />
          <h2 className="text-xl lg:text-2xl font-semibold text-muted-foreground outfit">
            Start a new conversation
          </h2>
          <p className="text-sm text-muted-foreground mt-2 px-2">
            Search for users by their email to start chatting with them.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
