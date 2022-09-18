const Notification = ({ content }) => {
  const [message, isError] = content;
  const notifactionStyles = {
    color: "green",
    background: "lightgreen",
    fontSize: "15px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    marginBottom: "10px",
  };
  const errorStyles = {
    ...notifactionStyles,
    color: "red",
    background: "lightred",
  };
  return (
    message && (
      <div className="error" style={isError ? errorStyles : notifactionStyles}>
        {message}
      </div>
    )
  );
};

export default Notification;
