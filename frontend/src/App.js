import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    setChat([...chat, { role: "user", text: message }]);

    const res = await fetch("https://YOUR-BACKEND-URL.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2x1 font-bold mb-4">Kairo</h1>
      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg shadow-md h-[400px] overflow-y-auto">
        {chat.map((c, i) => (
          <div key={i} className={`my-2 ${c.role === "user" ? "text-blue-400" : "text-green-400"}`}>
            <b>{c.role === "user" ? "You" : "Bot"}:</b> {c.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4 w-full max-w-lg">
        <input
          className="flex-1 p-2 rounded-l-lg text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
