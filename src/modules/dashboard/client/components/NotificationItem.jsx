const NotificationItem = ({ note, onRead }) => {
  return (
    <div className={`border p-3 rounded mb-2 ${note.read ? "bg-gray-100" : ""}`}>
      <p className="font-semibold">{note.title}</p>
      <p>{note.message}</p>

      {!note.read && (
        <button onClick={onRead} className="text-blue-600 mt-1">
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
