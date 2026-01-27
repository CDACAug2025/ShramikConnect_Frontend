import { useState } from "react";
import { toast } from "react-toastify";

const Chat = () => {
  const [text, setText] = useState("");
  const [botQ, setBotQ] = useState("");
  const [botA, setBotA] = useState("");
  
  const messages = [
    { id: 1, sender: "Raj Kumar", message: "Hello! I've started working on your plumbing job.", time: "10:30 AM" },
    { id: 2, sender: "You", message: "Great! When do you expect to complete it?", time: "10:32 AM" },
    { id: 3, sender: "Raj Kumar", message: "I should be done by tomorrow evening.", time: "10:35 AM" }
  ];

  const handleSend = () => {
    if (text.trim()) {
      toast.success("Message sent!");
      setText("");
    }
  };

  const handleBot = () => {
    if (botQ.trim()) {
      setBotA("I can help you with job-related queries. What would you like to know?");
      setBotQ("");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chat with Worker - Raj Kumar</h2>

      <div className="card mb-4" style={{height: '400px'}}>
        <div className="card-body overflow-auto">
          {messages.map((m) => (
            <div key={m.id} className={`d-flex mb-3 ${
              m.sender === 'You' ? 'justify-content-end' : 'justify-content-start'
            }`}>
              <div className={`p-2 rounded ${
                m.sender === 'You' ? 'bg-primary text-white' : 'bg-light'
              }`} style={{maxWidth: '70%'}}>
                <small><strong>{m.sender}</strong></small>
                <div>{m.message}</div>
                <small className="text-muted">{m.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>🤖 AI Help Assistant</h5>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ask me anything..."
              value={botQ}
              onChange={(e) => setBotQ(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleBot}>
              Ask
            </button>
          </div>
          
          {botA && (
            <div className="alert alert-success">
              <strong>AI Assistant:</strong> {botA}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
