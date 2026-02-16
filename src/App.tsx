import WorkoutScreen from "./components/WorkoutScreen";
import { sampleWorkout } from "./data";

function App() {
  return <WorkoutScreen initialWorkout={sampleWorkout} />;
}

export default App;