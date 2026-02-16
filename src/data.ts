import type { WorkoutDay } from "./types";

const emptySet = () => ({ lbs: null, reps: null });
const emptySets = (count: number) => Array.from({ length: count }, emptySet);

export const sampleWorkout: WorkoutDay = {
  id: "day-b",
  label: "Day B",
  focus: "Lower Body",
  date: "",
  exercises: [
    {
      id: "squat",
      name: "Squat",
      targetWeight: 165,
      sets: emptySets(3),
    },
    {
      id: "rdl",
      name: "Romanian Deadlift",
      targetWeight: 125,
      sets: emptySets(3),
    },
    {
      id: "hip-thrust",
      name: "Hip Thrusts",
      targetWeight: 160,
      sets: emptySets(3),
    },
    {
      id: "leg-curl",
      name: "Leg Curls",
      targetWeight: 80,
      sets: emptySets(3),
    },
  ],
};
