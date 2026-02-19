import type { WorkoutDay } from "./types";

const emptySet = () => ({ lbs: null, reps: null });
const emptySets = (count: number) => Array.from({ length: count }, emptySet);

export const sampleWorkoutB: WorkoutDay = {
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


export const sampleWorkoutA: WorkoutDay = {
  id: "day-a",
  label: "Day A",
  focus: "Upper Body",
  date: "",
  exercises: [
    {
      id: "bench-press",
      name: "Bench Press",
      targetWeight: 165,
      sets: emptySets(3),
    },
    {
      id: "overhead-press",
      name: "Overhead Press",
      targetWeight: 95,
      sets: emptySets(3),
    },
    {
      id: "cable-row",
      name: "Cable Row",
      targetWeight: 160,
      sets: emptySets(3),
    },
    {
      id: "assisted-pullup",
      name: "Assisted Pull Ups",
      targetWeight: 80,
      sets: emptySets(3),
    },
  ],
};