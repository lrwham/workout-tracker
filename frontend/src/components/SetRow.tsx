import type { WorkoutSet } from "../types";

type SetRowProps = {
  setNumber: number;
  value: WorkoutSet;
  onChange: (updated: WorkoutSet) => void;
  onRemove?: () => void;
  disableRemove?: boolean;
};

export default function SetRow({
  setNumber,
  value,
  onChange,
  onRemove,
  disableRemove = false,
}: SetRowProps) {
  const handleLbsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange({ ...value, lbs: raw === "" ? null : Number(raw) });
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange({ ...value, reps: raw === "" ? null : Number(raw) });
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <span className="w-8 text-lg text-neutral-500 shrink-0">
        S{setNumber}
      </span>
      <input
        type="number"
        inputMode="numeric"
        placeholder="lbs"
        value={value.lbs ?? ""}
        onChange={handleLbsChange}
        className="w-20 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-base text-center
                   placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      />
      <span className="text-neutral-400 text-base">×</span>
      <input
        type="number"
        inputMode="numeric"
        placeholder="reps"
        value={value.reps ?? ""}
        onChange={handleRepsChange}
        className="w-20 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-base text-center
                   placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      />
      {onRemove && (
        <button
          aria-label={`Remove set ${setNumber}`}
          onClick={onRemove}
          disabled={disableRemove}
        className="disabled:hover:bg-neutral-200 disabled:hover:text-neutral-500 disabled:opacity-30 disabled:cursor-not-allowed bg-neutral-200 text-neutral-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 active:ring-blue-600 w-8 rounded-md ml-auto"
      > &minus; </button>
      )}
    </div>
  );
}