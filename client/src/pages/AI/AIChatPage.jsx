import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaRobot,
  FaPlus,
  FaBars,
  FaTimes,
  FaPaperPlane,
  FaSpinner,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

import {
  chatWithAI,
  getAIChats,
  getAIChat,
  deleteAIChat,
} from "../../services/ai.service";

import { useAuth } from "../../context/AuthContext";

const AIChatPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const messagesEndRef = useRef(null);

  // ==========================================
  // LOAD CHAT HISTORY
  // ==========================================

  useEffect(() => {
    const loadChats = async () => {
      if (!isAuthenticated) {
        setChats([]);
        return;
      }

      try {
        const data = await getAIChats();

        setChats(data?.chats || data?.data || []);
      } catch (error) {
        console.error("Failed to load AI chats:", error);

        // Don't show error for auth problems
        setChats([]);
      }
    };

    loadChats();
  }, [isAuthenticated]);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    // Add user message
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
      const data = await chatWithAI(message, activeChatId);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.message || "Sorry, I couldn't generate a response.",
        },
      ]);

      // Save chatId
      if (data?.chatId) {
        setActiveChatId(data.chatId);
      }

      // Refresh chat history
      if (isAuthenticated) {
        try {
          const chatsData = await getAIChats();

          setChats(chatsData?.chats || chatsData?.data || []);
        } catch (historyError) {
          console.error("Failed to refresh AI chats:", historyError);
        }
      }
    } catch (error) {
      console.error("AI Chat Error:", error);

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

  // ==========================================
  // NEW CHAT
  // ==========================================

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setActiveChatId(null);
  };

  // ==========================================
  // OPEN EXISTING CHAT
  // ==========================================

  const handleOpenChat = async (chatId) => {
    if (!chatId || loading) return;

    try {
      setLoading(true);

      const data = await getAIChat(chatId);

      const chat = data?.chat || data?.data;

      if (!chat) return;

      setActiveChatId(chat._id || chat.id);

      setMessages(
        chat.messages?.map((message) => ({
          role: message.role,
          content: message.content,
        })) || [],
      );

      // Mobile par sidebar close
      setSidebarOpen(false);
    } catch (error) {
      console.error("Failed to load AI chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE CHAT
  // ==========================================

  const handleDeleteChat = async (chatId) => {
    if (!chatId) return;

    try {
      await deleteAIChat(chatId);

      setChats((prev) =>
        prev.filter((chat) => (chat._id || chat.id) !== chatId),
      );

      if (activeChatId === chatId) {
        handleNewChat();
      }
    } catch (error) {
      console.error("Failed to delete AI chat:", error);
    }
  };

  // ==========================================
  // GO BACK
  // ==========================================

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* ==========================================
          MOBILE OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex w-72 flex-col
          border-r border-slate-200
          bg-slate-50
          transition-transform duration-300

          md:relative
          md:translate-x-0

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
        `}
      >
        {/* Sidebar Header */}

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <FaRobot className="text-xl text-indigo-600" />

            <span className="font-bold text-slate-900">StudentHub AI</span>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 md:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* New Chat */}

        <div className="p-3">
          <button
            type="button"
            onClick={handleNewChat}
            className="flex w-full items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FaPlus />
            New Chat
          </button>
        </div>

        {/* Chat History */}

        <div className="flex-1 overflow-y-auto px-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recent Chats
          </p>

          {/* Guest */}

          {!isAuthenticated && (
            <p className="px-3 py-3 text-sm text-slate-400">
              Login to see your chat history.
            </p>
          )}

          {/* Logged-in User */}

          {isAuthenticated && chats.length === 0 && (
            <p className="px-3 py-3 text-sm text-slate-400">
              No previous chats.
            </p>
          )}

          {/* Chats */}

          {isAuthenticated &&
            chats.map((chat) => {
              const chatId = chat._id || chat.id;

              return (
                <div
                  key={chatId}
                  className="group mb-1 flex items-center gap-1 rounded-lg hover:bg-slate-200"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenChat(chatId)}
                    className="min-w-0 flex-1 truncate px-3 py-3 text-left text-sm text-slate-600"
                  >
                    {chat.title || chat.messages?.[0]?.content || "New Chat"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteChat(chatId)}
                    className="mr-2 rounded p-2 text-slate-400 opacity-0 transition hover:bg-red-100 hover:text-red-500 group-hover:opacity-100"
                    title="Delete chat"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              );
            })}
        </div>

        {/* Sidebar Bottom */}

        <div className="border-t border-slate-200 p-4">
          <p className="text-center text-xs text-slate-400">
            StudentHub AI Assistant
          </p>
        </div>
      </aside>

      {/* ==========================================
          MAIN CHAT AREA
      ========================================== */}

      <main className="flex min-w-0 flex-1 flex-col">
        {/* ==========================================
            HEADER
        ========================================== */}

        <header className="flex h-16 shrink-0 items-center border-b border-slate-200 px-4 sm:px-6">
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={handleBack}
            className="mr-2 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            title="Go Back"
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>

          {/* SIDEBAR BUTTON */}

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            title="Toggle Sidebar"
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          {/* AI PROFILE */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <FaRobot />
            </div>

            <div>
              <h1 className="font-semibold text-slate-900">StudentHub AI</h1>

              <p className="text-xs text-slate-500">Your AI career assistant</p>
            </div>
          </div>
        </header>

        {/* ==========================================
            MESSAGES
        ========================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-8 sm:px-6">
            {/* EMPTY STATE */}

            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <FaRobot className="text-3xl" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  How can I help you?
                </h2>

                <p className="mt-3 max-w-lg text-sm text-slate-500 sm:text-base">
                  Ask me about internships, projects, coding, resumes,
                  interviews, career paths, or anything related to your learning
                  journey.
                </p>

                {/* Suggestions */}

                <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "How can I become a full stack developer?",
                    "Give me some AI project ideas",
                    "Help me prepare for an interview",
                    "How can I improve my resume?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CHAT MESSAGES */}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[90%]
                    whitespace-pre-wrap
                    break-words
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-7
                    sm:max-w-[80%]
                    sm:px-5

                    ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* LOADING */}

            {loading && (
              <div className="mb-6 flex justify-start">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-5 py-3 text-sm text-slate-500">
                  <FaSpinner className="animate-spin" />
                  StudentHub AI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ==========================================
            INPUT AREA
        ========================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Message StudentHub AI..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-slate-400">
              StudentHub AI can make mistakes. Verify important information.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AIChatPage;
