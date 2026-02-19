import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import WorkoutScreen from "./components/WorkoutScreen";
import { sampleWorkoutA, sampleWorkoutB } from "./data";

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
      initialWorkout={sampleWorkoutA}
      token={token}
      email={email}
      onLogout={handleLogout}
    />
  );
}

export default App;