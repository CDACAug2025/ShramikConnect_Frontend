const HistoryCard = ({ title, subtitle }) => {
  return (
    <div className="border p-3 rounded mb-2">
      <p><b>{title}</b></p>
      <p>{subtitle}</p>
    </div>
  );
};

export default HistoryCard;
