const ActionAlert = ({ text, type = "success" }) => {
  const backgroundColor =
    type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <p
      className={`fixed top-4 right-4 ${backgroundColor} text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 animate-fade-in-out z-50`}
    >
      {text}
    </p>
  );
};

export default ActionAlert;
