import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Theme } from "../types";
import ThemeToggle from "./ThemeToggle";


type ExerciseRow = {
  name: string;
  targetWeight: string;  // string while editing, convert on submit
  numSets: string;
};

const emptyExercise = (): ExerciseRow => ({
  name: "",
  targetWeight: "",
  numSets: "3",
});

export default function TemplateCreator({ token, theme, onToggleTheme }: { token: string; theme: Theme; onToggleTheme: () => void }) {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  const [focus, setFocus] = useState("");
  const [exercises, setExercises] = useState<ExerciseRow[]>([emptyExercise()]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateExercise = (index: number, field: keyof ExerciseRow, value: string) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError(null);

    if (!label.trim() || !focus.trim()) {
      setError("Label and focus are required.");
      return;
    }

    const parsed = exercises.map((ex) => ({
      name: ex.name.trim(),
      target_weight: parseFloat(ex.targetWeight),
      num_sets: parseInt(ex.numSets, 10),
    }));

    if (parsed.some((ex) => !ex.name || isNaN(ex.target_weight) || isNaN(ex.num_sets) || ex.num_sets < 1)) {
      setError("Each exercise needs a name, valid weight, and at least 1 set.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ label, focus, exercises: parsed }),
      });

      if (!res.ok) {
        setError("Failed to save template.");
        return;
      }

      navigate("/");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">New Template</h1>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => navigate("/")}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            Cancel
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="label" className="text-sm text-neutral-500 dark:text-neutral-400">
                Label
              </label>
              <input
                id="label"
                type="text"
                placeholder="Day A"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="rounded-md border border-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 text-base
                           focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="focus" className="text-sm text-neutral-500 dark:text-neutral-400">
                Focus
              </label>
              <input
                id="focus"
                type="text"
                placeholder="Upper Body"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="rounded-md border border-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 text-base
                           focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Exercises</h2>

            {exercises.map((exercise, i) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-200 bg-white dark:bg-neutral-800 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">Exercise {i + 1}</span>
                  {exercises.length > 1 && (
                    <button
                      onClick={() => removeExercise(i)}
                      className="text-xs text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) => updateExercise(i, "name", e.target.value)}
                  className="rounded-md border border-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 text-base
                             focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
                />
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-neutral-400 dark:text-neutral-500">Target lbs</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="135"
                      value={exercise.targetWeight}
                      onChange={(e) => updateExercise(i, "targetWeight", e.target.value)}
                      className="rounded-md border border-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 text-base
                                 focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-neutral-400 dark:text-neutral-500">Sets</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="3"
                      value={exercise.numSets}
                      onChange={(e) => updateExercise(i, "numSets", e.target.value)}
                      className="rounded-md border border-neutral-300 bg-white dark:bg-neutral-800 px-2 py-1 text-base
                                 focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setExercises([...exercises, emptyExercise()])}
              className="rounded-md border border-dashed border-neutral-300 text-neutral-500 dark:border-neutral-600 dark:text-neutral-400
                         py-2 text-sm hover:border-neutral-400 hover:text-neutral-700 dark:hover:border-neutral-500 dark:hover:text-neutral-300
                         focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              + Add Exercise
            </button>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="rounded-md bg-blue-600 text-white dark:text-neutral-100 py-2 text-lg font-semibold
                       hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                       disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>
    </div>
  );
}