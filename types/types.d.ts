type ExerciseFolder = {
    folderName: string;
    id: number;
}

type WorkoutFoldersGetParams = {
    params: {
        folder: string
    }
}

type Folder = {
    folderName: string
    folderId: number
}

type NotificationStatus =  "info" | "warning" | "success" | "error" | "loading" | undefined