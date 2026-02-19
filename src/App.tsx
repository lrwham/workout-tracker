import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import WorkoutScreen from "./components/WorkoutScreen";
import { sampleWorkout } from "./data";

function App() {
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

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <WorkoutScreen
      initialWorkout={sampleWorkout}
      token={token}
      onLogout={handleLogout}
    />
  );
}

export default App;