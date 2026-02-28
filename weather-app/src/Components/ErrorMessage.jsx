function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-700 p-3 rounded mt-4 text-center font-medium text-sm sm:text-base">
      {message}
    </div>
  );
}

export default ErrorMessage;
