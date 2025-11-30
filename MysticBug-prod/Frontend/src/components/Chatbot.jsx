import { useState, useEffect } from "react";
import { default_page_images, images } from "../assets/assets";

const ChatBot = () => {
  const [botPopup, setBotPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/faqs`);
        const data = await res.json();
        setFaqs(data.message || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    if (botPopup) {
      fetchFaqs();
      // welcome message when bot opens
      setMessages([
        {
          type: "bot",
          text: "👋 Hello! How can I help you? Please select a question below:",
          timestamp: new Date(),
        },
      ]);
    }
  }, [botPopup, BASE_URL]);

  const handleQuestionClick = async (id, question) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: question,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/faqs/${id}`);
      const data = await response.json();

      // Add bot's answer to chat
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: data.message.answer,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I couldn't fetch the answer. Please try again.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBotPopup(false);
    setMessages([]);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      {!botPopup && (
        <button
          onClick={() => setBotPopup(true)}
          className="fixed bottom-16 right-6 sm:bottom-6 sm:right-10 w-28 h-28 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        >
          <img src={default_page_images.bot} alt="" />
        </button>
      )}

      {/* CHAT POPUP */}
      {botPopup && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[150] border border-gray-200">
          <div className="bg-green-900 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img src={default_page_images.rounded_bot} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Support Bot</h3>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              X
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.type === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800 shadow-sm border border-gray-200"
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-400"
                      }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}


          </div>

          {/* FAQ BUTTONS */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <p className="text-xs text-gray-500 mb-3 font-medium">
              Frequently Asked Questions:
            </p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {faqs.map((faq) => (
                <button
                  key={faq._id}
                  onClick={() => handleQuestionClick(faq._id, faq.question)}
                  disabled={isLoading}
                  className="w-full text-left p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-sm text-gray-700 transition-all duration-200 border border-blue-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;