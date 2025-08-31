import React, { useEffect, useRef, useState } from "react";
import { RiChatSmile3Fill } from "react-icons/ri";
import useSocketStore, { type User } from "../../store/socketStore";
import useAuthStore from "../../store/authStore";
import Loading from "../../components/load";
import { ArrowLeft, Send } from "lucide-react";

type ChatPageProps = {
  selectedConversation: string;
  selectedConversationId: string;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string>>;
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string>>;
  convUser: User | null;
};

const ChatPage: React.FC<ChatPageProps> = ({
  selectedConversation,
  selectedConversationId,
  setSelectedConversation,
  setSelectedConversationId,
  convUser,
}) => {
  const [startNewConv, setStartNewConv] = useState(false);
  const { userData } = useAuthStore();
  const { fetchMessages, messages, sendMessage } = useSocketStore();
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (userData && selectedConversationId) {
        fetchMessages(
          userData._id,
          selectedConversation,
          selectedConversationId
        );
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversationId]);

  const msgs = messages[selectedConversationId] || [];

  return (
    <div className="w-full relative">
      {selectedConversation ? (
        <div className="max-md:fixed max-md:top-0 bg-black w-full h-full md:h-[calc(100vh-110px)]">
          <div className="flex-1 w-full flex flex-col z-20 relative">
            {isLoading && <Loading />}
            {/* Chat Header */}
            <div className="p-4 border-b border-muted bg-card/50 backdrop-blur-sm flex items-center justify-between h-[80px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {convUser?.avatar ? (
                    <img src="/diverse-group.png" />
                  ) : (
                    <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center outfit">
                      {convUser
                        ? convUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : ""}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold outfit text-foreground">
                    {convUser?.name}
                  </h2>
                  <div className="w-full h-px bg-gradient-to-r from-primary via-accent to-transparent mt-1"></div>
                </div>
              </div>
              <div
                className="p-1 md:hidden bordr rounded-full text-muted-foreground cursor-pointer bg-accent/10 hover:bg-accent/20 transition-all duration-200"
                onClick={() => {
                  setSelectedConversation("");
                  setSelectedConversationId("");
                }}
              >
                <ArrowLeft />
              </div>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto scrollbar h-[calc(100vh-160px)] md:h-[calc(100vh-270px)] p-4 space-y-4">
              {msgs.length ? (
                msgs.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.senderId === userData?._id
                        ? "justify-end"
                        : "justify-start"
                    } slide-up`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === userData?._id
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      } shadow-lg`}
                    >
                      <p className="text-sm break-words whitespace-pre-wrap outfit">
                        {message.text}
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        {new Date(message.timestamp!).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div ref={bottomRef} />
                  </div>
                ))
              ) : (
                <div>Err</div>
              )}
            </div>

            {/* Message Input */}

            <div className="flex gap-2 h-[80px] border-t border-muted px-4 items-center">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-input border border-muted rounded-full px-4 py-2 focus:ring-1 focus:ring-primary/50 transition-all duration-200 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userData && newMessage.trim()) {
                    e.preventDefault();
                    sendMessage({
                      text: newMessage,
                      receiverId: selectedConversation,
                      senderId: userData._id,
                    });
                    setNewMessage("");
                  }
                }}
              />
              <button
                onClick={() => {
                  sendMessage({
                    text: newMessage,
                    receiverId: selectedConversation,
                    senderId: userData!._id,
                  });
                  setNewMessage("");
                }}
                className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-hover sparkle-hover transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full items-center justify-center flex flex-col text-center z-10 p-4">
          <RiChatSmile3Fill size={40} className="text-primary animate-bounce" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/75 outfit mt-4">
            Select a chat to start messaging or start a new conversation
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-light">
            Your conversations will appear here.
            <br />
            Start by selecting an online user from the left, or start a new one!
          </p>
          <hr />
          <button
            onClick={() => setStartNewConv(true)}
            className="bg-accent/15 hover:bg-accent/5 p-4 outfit cursor-pointer mt-4"
          >
            Click here to start a new chat
          </button>
        </div>
      )}
      {startNewConv && (
        <>
          <div
            className="absolute inset-0 bg-black/50 z-30 backdrop-blur-xl"
            onClick={() => setStartNewConv(false)}
          />
          <div className=" p-4 z-40 w-[280px] sm:w-[320px] md:w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 flex flex-col items-center gap-4 shadow-2xl shadow-black">
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
    </div>
  );
};

export default ChatPage;
