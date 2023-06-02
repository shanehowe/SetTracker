// Seed database with generic exercises
import { PrismaClient } from "@prisma/client"

const weightliftingExercises = [
    // Chest Exercises
    "Bench Press",
    "Incline Bench Press",
    "Inclide Dumbell Press",
    "Dumbbell Press",
    "Dumbbell Flyes",
    "Cable Flys",
  
    // Back Exercises
    "Deadlift",
    "Bent Over Rows",
    "Pull-ups",
    "Lat Pulldowns",
    "T-Bar Rows",
    "Dumbbell Rows",
    "Seated rows",
  
    // Shoulder Exercises
    "Shoulder Press",
    "Arnold Press",
    "Lateral Raises",
    "Front Raises",
    "Upright Rows",
    "Dumbbell Shoulder Press",
    "Dumbbell Lateral Raises",
  
    // Leg Exercises
    "Squat",
    "Front Squat",
    "Lunges",
    "Leg Press",
    "Deadlift",
    "Sumo Deadlift",
    "Dumbbell Squat",
    "Dumbbell Lunges",
  
    // Bicep Exercises
    "Barbell Curls",
    "Dumbbell Curls",
    "Hammer Curls",
    "Preacher Curls",
    "Concentration Curls",
    "Dumbbell Hammer Curls",
  
    // Tricep Exercises
    "Tricep Dips",
    "Skull Crushers",
    "Tricep Pushdowns",
    "Close Grip Bench Press",
    "Overhead Tricep Extension",
    "Dumbbell Tricep Kickbacks",
  
    // Additional Exercises
    "Goblet Squat",
    "Romanian Deadlift",
    "Arnold Dumbbell Press",
    "Seated Dumbbell Shoulder Press",
  ];

const prisma = new PrismaClient()
async function main() {
    weightliftingExercises.forEach(async (exercise) => {
        await prisma.exercise.create({
            data: {
                name: exercise
            }
        })
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e: Error) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })