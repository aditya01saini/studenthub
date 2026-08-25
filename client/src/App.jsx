import { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

import AIChat from "./components/ai/AIChat";
import AIChatButton from "./components/ai/AIChatButton";

const AppContent = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const location = useLocation();

  // Full-page AI Chat ke andar floating chatbot hide rahega
  const isAIChatPage = location.pathname === "/ai-chat";

  return (
    <>
      <AppRoutes />

      {/* AI Assistant - Other pages par available rahega */}
      {!isAIChatPage && (
        <>
          {aiChatOpen && <AIChat onClose={() => setAiChatOpen(false)} />}

          <AIChatButton
            isOpen={aiChatOpen}
            onClick={() => setAiChatOpen((prev) => !prev)}
          />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
