import type { Exercise, WorkoutSet } from "../types";
import SetRow from "./SetRow";

type ExerciseCardProps = {
  exercise: Exercise;
  onExerciseChange: (updated: Exercise) => void;
};

export default function ExerciseCard({ exercise, onExerciseChange }: ExerciseCardProps) {
  const handleSetChange = (index: number, updated: WorkoutSet) => {
    const newSets = [...exercise.sets];
    newSets[index] = updated;
    onExerciseChange({ ...exercise, sets: newSets });
  };

  const handleRemoveSet = (index: number) => {
    const newSets = exercise.sets.filter((_, i) => i !== index);
    onExerciseChange({ ...exercise, sets: newSets });
  };

  const handleAddSet = () => {
    const newSets = [...exercise.sets, { lbs: null, reps: null }];
    onExerciseChange({ ...exercise, sets: newSets });
  };

  const isSingleSet = exercise.sets.length <= 1;

  return (
    <div className="flex rounded-2xl bg-white border border-neutral-200 overflow-hidden">
      <div className="flex flex-col items-center justify-between bg-neutral-100 px-2 py-3 min-w-12">
        <span
          className="text-lg font-semibold text-neutral-700 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {exercise.name}
        </span>
        <span className="text-xs text-neutral-400 mt-2">
          {exercise.targetWeight} lb
        </span>
      </div>
      <div className="flex-1 px-3 py-2 divide-y divide-neutral-100">
        {exercise.sets.map((set, i) => (
          <SetRow
            key={i}
            setNumber={i + 1}
            value={set}
            onChange={(updated) => handleSetChange(i, updated)}
            onRemove={() => handleRemoveSet(i)}
            disableRemove={isSingleSet}
          />
        ))}
        <div className="flex items-center gap-4 py-4">
          <span className="w-8 text-lg text-neutral-400 shrink-0">
            S{exercise.sets.length + 1}
          </span>
          <button
            onClick={handleAddSet}
            className="flex-1 rounded-md border border-dashed border-neutral-300 text-neutral-500
                       py-1.5 text-sm font-medium
                       hover:border-neutral-400 hover:text-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            + Add Set
          </button>
        </div>
      </div>
    </div>
  );
}