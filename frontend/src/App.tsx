// App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import TemplateCreator from "./components/TemplateCreator";
import WorkoutScreen from "./components/WorkoutScreen";
import AccountScreen from "./components/AccountScreen";
import { useTheme } from "./hooks/useTheme";
import ExerciseTemplateCreator from "./components/ExerciseTemplateCreator";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleLogin = (newToken: string, userEmail: string) => {
    setToken(newToken);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setToken(null);
    setEmail(null);
  };

  if (!token || !email) {
    return <LoginScreen onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              token={token}
              email={email}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/templates/new"
          element={
            <TemplateCreator
              token={token}
              email={email}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/workout/:templateId"
          element={
            <WorkoutScreen
              token={token}
              email={email}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/account"
          element={
            <AccountScreen
              token={token}
              email={email}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/exercises/new"
          element={
            <ExerciseTemplateCreator
              token={token}
              email={email}
              onLogout={handleLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
