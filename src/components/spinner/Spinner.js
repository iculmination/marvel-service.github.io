import Gif from "./Rhombus.gif";

const Spinner = () => {
  return (
    <img
      src={Gif}
      alt="Loading"
      style={{
        margin: "0 auto",
        alignSelf: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default Spinner;
