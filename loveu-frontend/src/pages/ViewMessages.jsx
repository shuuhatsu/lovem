import { Link } from "react-router-dom";
import bgImage from "../assets/images/tulips.jpg"; // replace with your image
import { useEffect, useState } from "react";

function ViewMessages({ messages, API_URL, onMessageDeleted }) {
  // State to trigger the intro animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Reset animation state briefly to allow re-animation
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50); // small delay to trigger transition
    return () => clearTimeout(timer);
  }, []); // runs every time component mounts

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Delete this message?")) return;

    try {
      await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
      });

      onMessageDeleted();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div
      className={`min-h-screen bg-pink-50 transition-all duration-1000 ease-out transform ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* TOP BACKGROUND IMAGE WITH TITLE */}
      <div
        className="w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          height: "325px", // adjustable
        }}
      >
        <h1 className="text-7xl tracking-widest font-bold text-pink-100 italic text-center px-4">
          Say what you feel
        </h1>
      </div>

      {/* CREATE BUTTON */}
      <div className="flex justify-center mt-6 mb-10">
        <Link
          to="/create"
          className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition-transform duration-500 hover:scale-105"
        >
          Create Message
        </Link>
      </div>

      {/* MESSAGE CARDS */}
      <div className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Link
              to={`/message/${msg.id}`}
              key={msg.id}
              className="relative bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform duration-700 hover:-translate-y-1 h-[150px] overflow-hidden"
            >
              {/* DELETE BUTTON */}
              <button
                onClick={(e) => handleDelete(msg.id, e)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>

              <h2 className="font-bold text-pink-600">
                {msg.sender} → {msg.receiver}
              </h2>

              <p className="text-gray-600 mt-2">
                {msg.message.length > 60
                  ? msg.message.substring(0, 60) + "..."
                  : msg.message}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewMessages;