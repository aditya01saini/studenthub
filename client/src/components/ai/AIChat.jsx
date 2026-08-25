import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { chatWithAI } from "../../services/ai.service";

const AIChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm StudentHub AI. I can help you with internships, projects, resumes, career guidance, and learning. How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await chatWithAI(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.message || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        bottom-24
        right-3
        left-3
        z-[100]
        flex
        h-[calc(100vh-8rem)]
        max-h-[600px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl

        sm:left-auto
        sm:right-6
        sm:w-[380px]
        sm:h-[600px]
      "
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-indigo-600 px-4 py-4 text-white sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <FaRobot />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold">StudentHub AI</h3>

            <p className="truncate text-xs text-indigo-100">
              Your career assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="ml-3 shrink-0 rounded-lg p-2 transition hover:bg-white/20"
          aria-label="Close AI chat"
        >
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-slate-50 p-3 sm:p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[90%]
                whitespace-pre-wrap
                break-words
                rounded-2xl
                px-3
                py-3
                text-sm
                leading-6
                sm:max-w-[85%]
                sm:px-4
                ${
                  message.role === "user"
                    ? "rounded-br-md bg-indigo-600 text-white"
                    : "rounded-bl-md bg-white text-slate-700 shadow-sm"
                }
              `}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              <FaSpinner className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        className="shrink-0 border-t border-slate-200 bg-white p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StudentHub AI..."
            disabled={loading}
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-slate-300
              px-3
              py-3
              text-sm
              outline-none
              transition
              focus:border-indigo-600
              focus:ring-2
              focus:ring-indigo-100
              disabled:bg-slate-100
              sm:px-4
            "
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              text-white
              transition
              hover:bg-indigo-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Send message"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
