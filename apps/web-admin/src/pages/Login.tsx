import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Phase 1: auth fake (on branche l’API en Phase 2)
    if (!email || !password) return;

    localStorage.setItem("token", "fake-token");
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 380,
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Connexion Admin</h1>

        <label style={{ display: "block", marginTop: 12 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="admin@email.com"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <label style={{ display: "block", marginTop: 12 }}>Mot de passe</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 16,
            padding: 10,
            borderRadius: 8,
            border: 0,
            background: "#1A56DB",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Se connecter
        </button>

        <p style={{ marginTop: 12, color: "#6B7280", fontSize: 13 }}>
          (Phase 1) Auth simulée. On branchera l’API en Phase 2.
        </p>
      </form>
    </div>
  );
}
