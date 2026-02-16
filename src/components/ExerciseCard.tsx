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

  return (
    <div className="flex rounded-2xl bg-white border border-neutral-200 overflow-hidden">
      <div className="flex flex-col items-center justify-between bg-neutral-100 px-2 py-3 min-w-[48px]">
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
          />
        ))}
      </div>
    </div>
  );
}
