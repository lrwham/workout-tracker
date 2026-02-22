// Page for creating a single new exercise template (eg. Bench Press)
// Page at /exercises/new
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Theme, TemplateExercise } from "../types";
import TopBar from "./TopBar";

type ExerciseTemplateCreatorProps = {
    token: string;
    email: string;
    onLogout: () => void;
    theme: Theme;
    onToggleTheme: () => void;
};

export default function ExerciseTemplateCreator({
    token,
    email,
    onLogout,
    theme,
    onToggleTheme,
}: ExerciseTemplateCreatorProps) {
    const navigate = useNavigate();
    const [exerciseName, setExerciseName] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [numSets, setNumSets] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!exerciseName || !targetWeight || !numSets) {
            alert("Please fill in all fields.");
            return;
        }

        const newExercise: TemplateExercise = {
            id: Date.now(), // Temporary ID, real one will come from backend
            name: exerciseName,
            targetWeight: parseFloat(targetWeight),
            numSets: parseInt(numSets),
            position: 0, // Position will be set when added to a template
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/exercises`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: exerciseName,
                    target_weight: parseFloat(targetWeight),
                    num_sets: parseInt(numSets),
                }),
            });

            if (!res.ok) throw new Error("Failed to create exercise");

            navigate("/"); // Go back to home after creation
        } catch (err) {
            alert("Error creating exercise. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans">
            <div className="max-w-md mx-auto px-4 py-6">
                <TopBar
                    pageTitle="Create Exercise Template"
                    email={email}
                    theme={theme}
                    onToggleTheme={onToggleTheme}
                    onLogout={onLogout} />

                <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">New Exercise</h2>

                    <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Exercise Name
                        <input
                            type="text"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
                        />
                    </label>

                    <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Target Weight (lbs)
                        <input
                            type="number"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
                        />
                    </label>

                    <label className="block mb-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Number of Sets
                        <input
                            type="number"
                            value={numSets}
                            onChange={(e) => setNumSets(e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Create Exercise
                    </button>
                </form>
            </div>
        </div>
    );
}