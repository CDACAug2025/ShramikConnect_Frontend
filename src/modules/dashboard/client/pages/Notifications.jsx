import { toast } from "react-toastify";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Job Application",
      message: "Raj Kumar applied for your plumbing job. Review application now.",
      type: "application",
      read: false,
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Payment Released",
      message: "Payment of ₹12,000 has been released to Amit Singh for painting job.",
      type: "payment",
      read: false,
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Job Completed",
      message: "Electrical work has been marked as completed. Please review and rate.",
      type: "completion",
      read: true,
      time: "2 days ago"
    }
  ];

  const handleMarkAsRead = (id) => {
    toast.success("Marked as read!");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          Notifications
          {unreadCount > 0 && (
            <span className="badge bg-danger ms-2">{unreadCount}</span>
          )}
        </h2>
        
        {unreadCount > 0 && (
          <button className="btn btn-primary btn-sm">
            Mark All Read
          </button>
        )}
      </div>

      {notifications.map(note => (
        <div key={note.id} className={`card mb-3 ${
          !note.read ? 'border-primary' : ''
        }`}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title d-flex align-items-center">
                  {note.title}
                  {!note.read && <span className="badge bg-primary ms-2">New</span>}
                </h5>
                <p className="card-text">{note.message}</p>
                <small className="text-muted">{note.time}</small>
              </div>
              
              {!note.read && (
                <button
                  onClick={() => handleMarkAsRead(note.id)}
                  className="btn btn-outline-primary btn-sm"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
