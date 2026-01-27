const ChatBox = ({ messages }) => {
  return (
    <div className="border p-3 h-64 overflow-y-auto">
      {messages.map((m, i) => (
        <p key={i}><b>{m.sender}:</b> {m.text}</p>
      ))}
    </div>
  );
};

export default ChatBox;
