import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>404</h2>
      <p>Page introuvable.</p>
      <Link to="/">Retour au dashboard</Link>
    </div>
  );
}
