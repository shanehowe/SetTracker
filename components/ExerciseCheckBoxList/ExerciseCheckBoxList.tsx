import { Exercise } from "@/types/types"
import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react"

interface ExerciseCheckboxListProps {
    exercises: Exercise[]
    handleExerciseClick: (exercise: string) => void
}

export function ExerciseCheckboxList({ exercises, handleExerciseClick }: ExerciseCheckboxListProps) {
    return (
        <CheckboxGroup>
            <Stack spacing={[1, 5]} direction={"column"}>
                {exercises.map((exercise) => {
                    return (
                        <Checkbox
                            value={exercise.name}
                            key={exercise.id}
                            onChange={() => handleExerciseClick(exercise.name)}
                        >
                            {exercise.name}
                        </Checkbox>
                    )
                })}
            </Stack>
        </CheckboxGroup>
    )
}