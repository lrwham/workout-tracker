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

export type TemplateExercise = {
  id: number;
  name: string;
  targetWeight: number;
  numSets: number;
  position: number;
};

export type WorkoutTemplate = {
  id: number;
  label: string;
  focus: string;
  exercises: TemplateExercise[];
};