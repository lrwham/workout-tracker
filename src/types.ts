export type WorkoutSet = {
  lbs: number | null;
  reps: number | null;
};

export type Exercise = {
  id: string;
  name: string;
  targetWeight: number;
  sets: WorkoutSet[];
};

export type WorkoutDay = {
  id: string;
  label: string;       // "Day B"
  focus: string;        // "Lower Body"
  date: string;
  exercises: Exercise[];
};
