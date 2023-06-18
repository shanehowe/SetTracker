type ExerciseFolder = {
    folderName: string;
    id: number;
}

type WorkoutFoldersGetParams = {
    params: {
        folder: string
    }
}

type Exercise = {
    id: number,
    name: string
}

type Folder = {
    folderName: string
    folderId: number
}

type WeightSet = {
    weight: number
    exercise: string
    reps: number
    createdAt?: Date
}

type NotificationStatus =  "info" | "warning" | "success" | "error" | "loading" | undefined