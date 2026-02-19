import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { WorkoutDay, WorkoutTemplate, Exercise } from "../types";
import ExerciseCard from "./ExerciseCard";

function sortKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeysDeep);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortKeysDeep((obj as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, unknown>);
  }
  return obj;
}

function templateToWorkoutDay(template: WorkoutTemplate): WorkoutDay {
  return {
    id: `workout-${template.id}`,
    label: template.label,
    focus: template.focus,
    date: "",
    exercises: template.exercises
      .sort((a, b) => a.position - b.position)
      .map((ex, i) => ({
        id: `exercise-${i}`,
        name: ex.name,
        targetWeight: ex.targetWeight,
        sets: Array.from({ length: ex.numSets }, () => ({ lbs: null, reps: null })),
      })),
  };
}

type WorkoutScreenProps = {
  token: string;
};

export default function WorkoutScreen({ token }: WorkoutScreenProps) {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutDay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/templates/${templateId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to load template");

        const data = await res.json();
        const template: WorkoutTemplate = {
          id: data.id,
          label: data.label,
          focus: data.focus,
          exercises: data.exercises.map((ex: any) => ({
            id: ex.id,
            name: ex.name,
            targetWeight: ex.target_weight,
            numSets: ex.num_sets,
            position: ex.position,
          })),
        };
        setWorkout(templateToWorkoutDay(template));
      } catch {
        setError("Couldn't load workout template.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, token]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout(workout ? { ...workout, date: e.target.value } : null);
  };

  const handleExerciseChange = (index: number, updated: Exercise) => {
    if (!workout) return;
    const newExercises = [...workout.exercises];
    newExercises[index] = updated;
    setWorkout({ ...workout, exercises: newExercises });
  };

  const handleRandomFill = () => {
    if (!workout) return;
    const dayOffset = Math.floor(Math.random() * 5) - 2;
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + dayOffset);
    const dateString = randomDate.toISOString().slice(0, 10);

    const randomized = workout.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({
        ...set,
        lbs: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
        reps: Math.floor(Math.random() * (15 - 6 + 1)) + 6,
      })),
    }));
    setWorkout({ ...workout, date: dateString, exercises: randomized });
  };

  const handleSave = async () => {
    if (!workout) return;
    const submission = {
      date: workout.date,
      exercises: workout.exercises.map((ex) => ({
        name: ex.name,
        sets: ex.sets.map((set) => ({
          lbs: set.lbs,
          reps: set.reps,
        })),
      })),
    };

    const jsonString = JSON.stringify(sortKeysDeep(submission));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submission),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const { hash } = await res.json();

      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(jsonString));
      const localHash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (hash === localHash) {
        console.log("Verified! Hash:", hash);
      } else {
        console.warn("Hash mismatch!", { server: hash, local: localHash });
      }

      navigate("/");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 font-sans">
        <div className="max-w-md mx-auto px-4 py-6">
          <p className="text-sm text-neutral-400">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-screen bg-neutral-100 font-sans">
        <div className="max-w-md mx-auto px-4 py-6">
          <p className="text-sm text-red-600">{error ?? "Something went wrong."}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 font-sans">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">
            {workout.label} — {workout.focus}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Cancel
          </button>
        </div>

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
            onClick={handleSave}
          >
            Save Workout
          </button>
        </div>
        {import.meta.env.DEV && (
          <div>
            <button
              className="mt-2 w-full rounded-md bg-neutral-300 text-neutral-800 py-2 text-lg font-semibold
                         hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              onClick={handleRandomFill}
            >
              Random Fill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}