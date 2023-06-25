import { GroupedSet } from "@/types/types";

export const sortGroupedSetsByDate = (sets: GroupedSet[]) => {
    sets.sort((a: GroupedSet, b: GroupedSet) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (dateA < dateB) {
            return 1;
        } else if (dateA > dateB) {
            return -1;
        } else {
            return 0;
        }
    })
}