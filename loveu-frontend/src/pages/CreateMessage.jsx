import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateMessage({ API_URL, onMessageCreated }) {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [slideIn, setSlideIn] = useState(false);
  const navigate = useNavigate();

  // Play intro every time the page loads
  useEffect(() => {
    setSlideIn(false); // reset
    const timeout = setTimeout(() => setSlideIn(true), 50); // small delay triggers transition
    return () => clearTimeout(timeout);
  }, []); // runs every mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("message", message);

    try {
      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        onMessageCreated();
        navigate("/");
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error creating message:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-pink-50 flex justify-center items-start pt-16">

      {/* Tulip emoji background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-4xl animate-tulip"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${-100 - Math.random() * 200}px`, // start off-screen behind footer
            animationDuration: `${8 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          🌷
        </span>
      ))}

      {/* Form with sliding intro */}
      <div
        className={`relative z-10 w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-700 ${
          slideIn ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-pink-200 px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">New Message</h2>
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Sender */}
          <div className="border-b px-6 py-3 flex items-center">
            <span className="w-20 text-gray-500 text-sm">From</span>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Your name"
              required
            />
          </div>

          {/* Receiver */}
          <div className="border-b px-6 py-3 flex items-center">
            <span className="w-20 text-gray-500 text-sm">To</span>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Recipient"
              required
            />
          </div>

          {/* Message Body */}
          <div className="px-6 py-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-64 outline-none resize-none"
              placeholder="Write your message..."
              required
            />
          </div>

          {/* Footer Send Button */}
          <div className="px-6 py-4 border-t flex justify-between items-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 shadow"
            >
              Send 💌
            </button>

            <span className="text-sm text-gray-400">
              Love Mail
            </span>
          </div>
        </form>
      </div>

      {/* Tulip animation CSS */}
      <style>{`
        @keyframes tulipFly {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        .animate-tulip {
          animation-name: tulipFly;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default CreateMessage;