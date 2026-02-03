import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [health, setHealth] = useState("...");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/health")
      .then((res) => setHealth(res.data.status))
      .catch(() => setHealth("error"));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Web Admin — Constitution RDC</h1>
      <p>
        API health: <b>{health}</b>
      </p>
    </div>
  );
}
