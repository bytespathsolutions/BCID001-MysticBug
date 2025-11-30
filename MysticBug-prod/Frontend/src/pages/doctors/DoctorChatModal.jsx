import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../admin/Loader";
import { icons } from "../../assets/assets"
const DoctorChatModal = ({ patient, onClose }) => {
  const { uid, userName } = useAuth();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const patientId = patient.patientId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch conversation
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/messages/conversation/${uid}/${patientId}`);

        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(data.messages || []);
        setLoading(false);

        // Mark patient ➝ doctor messages as read
        await fetch(`${BASE_URL}/messages/mark-read/${patientId}/${uid}`, {
          method: "PATCH",
        });
      } catch (error) {
        console.error("Conversation load error:", error);
      }
    };

    loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [uid, patientId, BASE_URL]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: uid,
          senderName: userName,
          senderRole: "doctor",
          receiverId: patientId,
          receiverName: patient.patientName,
          receiverRole: "patient",
          message: newMessage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] sm:h-[85vh] mt-8 sm:mt-16 flex flex-col  overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a7f7f] p-4 text-white flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
                {patient.patientName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-xl">{patient.patientName}</h2>
                <p className="font-medium text-md">patient</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 p-2 rounded-full flex justify-center items-center text-white hover:text-gray-200 transition text-3xl font-light"
            >
              <icons.MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a7f7f]"></div>
                <p className="text-gray-500 mt-4"><Loader /></p>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.senderId === uid ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[70%]">
                      {msg.senderId !== uid && (
                        <div className="w-8 h-8 bg-[#1a7f7f] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {patient.patientName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl ${msg.senderId === uid
                          ? "bg-[#1a7f7f] text-white rounded-br-none"
                          : "bg-white text-gray-800 shadow-md rounded-bl-none"
                          }`}
                      >  <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${msg.senderId === uid
                            ? "text-green-100"
                            : "text-gray-400"
                            }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {msg.senderId === uid && (
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {userName?.charAt(0).toUpperCase()}
                        </div>
                      )}

                    </div>
                  </div>
                ))
                }
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex p-4 gap-2 bg-white" >
            <input
              type="text"
              className="flex-1 px-4 py-3 border rounded-full"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="px-6 py-3 bg-[#1a7f7f] text-white rounded-full">
              Send →
            </button>
          </form>
        </div>
      </div >
    </div>
  );
};

export default DoctorChatModal;
