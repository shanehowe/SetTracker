type exerciseFolder = {
    title: string;
    exercises: string[];
}

type WorkoutFoldersGetParams = {
    params: {
        folder: string
    }
}

type NotificationStatus =  "info" | "warning" | "success" | "error" | "loading" | undefined