// App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import TemplateCreator from "./components/TemplateCreator";
import WorkoutScreen from "./components/WorkoutScreen";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [_email, setEmail] = useState<string | null>(null);

  const handleLogin = (newToken: string, userEmail: string) => {
    setToken(newToken);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setToken(null);
    setEmail(null);
  };

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen token={token} onLogout={handleLogout} />}
        />
        {/* We'll add these next: */}
        <Route
          path="/templates/new"
          element={<TemplateCreator token={token} />}
        />
        <Route
          path="/workout/:templateId"
          element={<WorkoutScreen token={token} />}
        />        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;