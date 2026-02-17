import { useState } from "react";
import type { WorkoutDay, Exercise } from "../types";
import ExerciseCard from "./ExerciseCard";

type WorkoutScreenProps = {
  initialWorkout: WorkoutDay;
};

export default function WorkoutScreen({ initialWorkout }: WorkoutScreenProps) {
  const [workout, setWorkout] = useState<WorkoutDay>(initialWorkout);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, date: e.target.value });
  };

  const handleExerciseChange = (index: number, updated: Exercise) => {
    const newExercises = [...workout.exercises];
    newExercises[index] = updated;
    setWorkout({ ...workout, exercises: newExercises });
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">
          {workout.label} — {workout.focus}
        </h1>

        <div className="flex items-center gap-2 mt-2 mb-6">
          <label htmlFor="workout-date" className="text-base text-neutral-500">
            Date
          </label>
          <input
            id="workout-date"
            type="date"
            value={workout.date}
            onChange={handleDateChange}
            className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-base
                       focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
        </div>

        <div className="flex flex-col gap-4">
          {workout.exercises.map((exercise, i) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onExerciseChange={(updated) => handleExerciseChange(i, updated)}
            />
          ))}
        </div>

        <div>
          <button
            className="mt-6 w-full rounded-md bg-blue-600 text-white py-2 text-lg font-semibold
             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              const submission = {
                date: workout.date,
                exercises: workout.exercises.map(ex => ({
                  name: ex.name,
                  sets: ex.sets.map(set => ({
                    lbs: set.lbs,
                    reps: set.reps,
                  })),
                })),
              };
              console.log(JSON.stringify(submission, null, 2));
            }}
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
}
