export interface Task {
    name: string;
    createdAt: number;
    endTime?: number;
    description: string;
    id?: string;
    completed: boolean;
}


export interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}
