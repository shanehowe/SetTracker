// Seed database with generic exercises
import { PrismaClient } from "@prisma/client"

const weightLiftingExercises = [
    // Chest
    'Barbell Bench Press',
    'Dumbbell Bench Press',
    'Incline Bench Press',
    'Dumbbell Incline Press',
    'Cable Chest Press',
    'Dumbbell Flyes',
    'Cable Flyes',
  
    // Legs
    'Barbell Squats',
    'Barbell Lunges',
    'Leg Press',
    'Hack Squats',
    'Romanian Deadlifts',
    'Leg Extensions',
    'Hamstring Curls',
    'Cable Pull-Throughs',
    'Calf Raises',
    "Deadlift",
    'Dumbbell Lunges',
  
    // Shoulders (Delts)
    'Barbell Shoulder Press',
    'Dumbbell Shoulder Press',
    'Arnold Press',
    'Lateral Raises',
    'Front Raises',
    'Upright Rows',
    'Cable Lateral Raises',
    'Cable Front Raises',
    'Dumbbell Shrugs',
    'Cable Face Pulls',
    "Rear Delt Flyes",
  
    // Biceps
    'Barbell Curls',
    'Dumbbell Curls',
    'Hammer Curls',
    'Preacher Curls',
    'Cable Curls',
    'EZ Bar Curls',
    'Incline Dumbbell Curls',
    'Spider Curls',
    'Reverse Curls',
  
    // Triceps
    'Close-Grip Bench Press',
    'Skull Crushers',
    'Tricep Pushdowns',
    'Overhead Tricep Extension',
    'Dumbbell Tricep Kickbacks',
    'Cable Tricep Pushdowns',
    'Overhead Tricep Extension',
    'Dips',
    'Seated Tricep Extensions'
  ];
  

const prisma = new PrismaClient()
async function main() {
    weightLiftingExercises.forEach(async (exercise) => {
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