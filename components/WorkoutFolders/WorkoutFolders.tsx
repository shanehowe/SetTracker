import WorkoutFolder from "../WorkoutFolder/WorkoutFolder"

interface WorkoutFoldersProps {
    exerciseFolders: ExerciseFolder[] 
}
export default function WorkoutFolders({ exerciseFolders }: WorkoutFoldersProps) {
    return (
        <>
            {exerciseFolders.map((folder) => {
                return <WorkoutFolder key={folder.id} folder={folder} />
            })}
        </>
    )
}