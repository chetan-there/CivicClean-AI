import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a936f, #114b5f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "80px", marginBottom: "16px" }}>🗑️</div>
        <h1 style={{ fontSize: "72px", fontWeight: "800", margin: "0" }}>
          404
        </h1>
        <p style={{ fontSize: "20px", margin: "16px 0 32px" }}>
          Oops! This page was thrown in the garbage 🗑️
        </p>
        <Link
          to="/"
          style={{
            background: "white",
            color: "#114b5f",
            padding: "14px 32px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          🏠 Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
