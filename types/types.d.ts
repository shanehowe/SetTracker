type ExerciseFolder = {
    folderName: string;
    id: number;
}

type WorkoutFoldersGetParams = {
    params: {
        folder: string
    }
}

type NotificationStatus =  "info" | "warning" | "success" | "error" | "loading" | undefined