import { FaRobot, FaTimes } from "react-icons/fa";

const AIChatButton = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      className="
        fixed
        bottom-4
        right-4
        z-[110]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-indigo-600
        text-white
        shadow-xl
        transition-all
        duration-200
        hover:scale-105
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-4
        focus:ring-indigo-200

        sm:bottom-6
        sm:right-6
        sm:h-16
        sm:w-16
      "
    >
      {isOpen ? (
        <FaTimes className="text-xl" />
      ) : (
        <FaRobot className="text-2xl" />
      )}
    </button>
  );
};

export default AIChatButton;
