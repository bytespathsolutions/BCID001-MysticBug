import { useEffect, useState, useRef } from "react";
import { icons } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../admin/Loader";

const DoctorToDoctorChatModal = ({ doctor, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const { uid } = useAuth();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch messages between two doctors
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${BASE_URL}/messages/doctor-messages/${uid}/${doctor.uid}`
        );
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (uid && doctor.uid) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [uid, doctor.uid, BASE_URL]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/messages/doctor-send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: uid,
          receiverId: doctor.uid,
          message: newMessage.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");

      setNewMessage("");

      // Refresh messages immediately
      const messagesRes = await fetch(
        `${BASE_URL}/messages/doctor-messages/${uid}/${doctor._id}`
      );
      const data = await messagesRes.json();
      setMessages(data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f3e8d1] rounded-lg w-full max-w-4xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-[#004d4d] p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
              {doctor.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-white">
              <h2 className="font-bold text-xl">{doctor.name}</h2>
              <p className="font-medium text-md">doctor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 p-2 rounded-full flex justify-center items-center text-white hover:text-gray-200 transition text-3xl font-light"
          >
            <icons.MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading && (
            <p className="text-center text-[#004d4d] py-8"><Loader /></p>
          )}

          {!isLoading && messages.length === 0 && (
            <p className="text-center text-[#004d4d] py-8">
              No messages yet. Start the conversation!
            </p>
          )}

          {messages.map((msg) => {
            const isSender = msg.senderId === uid;
            return (
              <div
                key={msg._id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${isSender
                    ? "bg-[#004d4d] text-white"
                    : "bg-[#f6e2ac] text-[#004d4d]"
                    }`}
                >
                  <p className="text-sm break-words">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${isSender ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#004d4d]/20">
          <div className="flex items-center gap-2 bg-white rounded-lg p-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 outline-none px-2"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#004d4d] text-white p-2 rounded-lg hover:bg-[#006666] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorToDoctorChatModal;