import { ExerciseFolder } from "@/types/types"

const folderAlreadyExists = (folderName: string, currentFolders: ExerciseFolder[]): boolean => {
    return currentFolders.filter(folder => folder.folderName === folderName).length > 0
}

const trimAndTitleFolderName = (folderName: string): string => {
    const splitArr = folderName.split(" ")
    let joined = ""
    splitArr.forEach(word => {
        if (word.length > 1) {
            joined += word[0].toLocaleUpperCase() + word.substring(1).toLocaleLowerCase() + " "
        } else {
            joined += word.toLocaleLowerCase() + " "
        }
    })
    return joined.trim()
}

export const workoutFolderHelper = {
    folderAlreadyExists,
    trimAndTitleFolderName
}