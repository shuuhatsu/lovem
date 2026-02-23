import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewFullMessage({ messages }) {
  const { id } = useParams();
  const message = messages.find((m) => m.id == id);
  const [slideIn, setSlideIn] = useState(false);

  // Play intro every time the page loads
  useEffect(() => {
    setSlideIn(false);
    const timeout = setTimeout(() => setSlideIn(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  if (!message) {
    return (
      <div className="p-8 text-center">
        <p>Message not found.</p>
        <Link to="/" className="text-pink-500">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-pink-50 flex justify-center">

      {/* Tulip emoji background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-4xl animate-tulip"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${-100 - Math.random() * 200}px`, // start behind footer
            animationDuration: `${8 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          🌷
        </span>
      ))}

      {/* Main message container with slide-in intro */}
      <div
        className={`relative z-10 w-full max-w-xl bg-white min-h-screen border-l border-r transform transition-all duration-700 ${
          slideIn ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* HEADER */}
        <div className="p-4 border-b flex items-center">
          <Link to="/" className="mr-4 text-pink-500 font-bold">
            ←
          </Link>
          <h1 className="text-lg font-bold">Post</h1>
        </div>

        {/* POST CONTENT */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold">
              {message.sender.charAt(0).toUpperCase()}
            </div>

            <div className="ml-3">
              <p className="font-bold">{message.sender}</p>
              <p className="text-gray-500 text-sm">
                To {message.receiver}
              </p>
            </div>
          </div>

          <p className="text-xl whitespace-pre-line text-gray-800">
            {message.message}
          </p>
        </div>
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

export default ViewFullMessage;