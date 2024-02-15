import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 24, marginTop: 30, }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 24,
          marginTop: 30,
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
