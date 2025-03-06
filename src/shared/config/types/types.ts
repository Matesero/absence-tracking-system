export type Group = {
    groupNumber: number;
    isDeleted: boolean;
};

export type User = {
    id: string;
    email: string;
    fullName: string;
    group: Group;
    role: string;
    isBlocked: boolean;
};
