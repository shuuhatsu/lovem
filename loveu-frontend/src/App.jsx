import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewMessages from "./pages/ViewMessages";
import CreateMessage from "./pages/CreateMessage";
import ViewFullMessage from "./pages/ViewFullMessage";
import Footer from "./components/Footer";

function App() {
  const [messages, setMessages] = useState([]);
  const API_URL = "http://localhost/loveu/index.php/love";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* MAIN CONTENT */}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <ViewMessages
                  messages={messages}
                  API_URL={API_URL}
                  onMessageDeleted={fetchMessages}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateMessage
                  API_URL={API_URL}
                  onMessageCreated={fetchMessages}
                />
              }
            />
            <Route
              path="/message/:id"
              element={<ViewFullMessage messages={messages} />}
            />
          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;