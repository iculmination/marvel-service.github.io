import errorGif from "./icons8-error.gif";

const ErrorMessage = () => {
  return (
    <img
      src={errorGif}
      alt="Error"
      style={{ margin: "0 auto", alignSelf: "center", transform: "scale(1.1)" }}
    />
  );
};

export default ErrorMessage;
