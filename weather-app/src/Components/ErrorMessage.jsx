function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className="text-red-500 mt-4 font-semibold">{message}</p>;
}

export default ErrorMessage;
