import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { WorkoutTemplate } from "../types";

type HomeScreenProps = {
  token: string;
  onLogout: () => void;
};

export default function HomeScreen({ token, onLogout }: HomeScreenProps) {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch templates");

        const data = await res.json();
        const mapped: WorkoutTemplate[] = data.map((t: any) => ({
          id: t.id,
          label: t.label,
          focus: t.focus,
          exercises: t.exercises.map((ex: any) => ({
            id: ex.id,
            name: ex.name,
            targetWeight: ex.target_weight,
            numSets: ex.num_sets,
            position: ex.position,
          })),
        }));
        setTemplates(mapped);
      } catch {
        setError("Couldn't load templates.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-100 font-sans">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">My Workouts</h1>
          <button
            onClick={onLogout}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Log out
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg border border-neutral-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {template.label}
                  </h2>
                  <p className="text-sm text-neutral-500">{template.focus}</p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {template.exercises.length} exercises
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/workout/${template.id}`)}
                  className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-semibold
                             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/templates/new")}
          className="mt-6 w-full rounded-md border-2 border-dashed border-neutral-300
                     text-neutral-500 py-3 text-base font-medium
                     hover:border-neutral-400 hover:text-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          + Create New Template
        </button>
      </div>
    </div>
  );
}