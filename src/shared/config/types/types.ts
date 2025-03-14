export type Group = {
    groupNumber: number;
    isDeleted: boolean;
};

export type Roles = 'admin' | 'deanery' | 'teacher' | 'student';

export type User = {
    id: string;
    email: string;
    fullName: string;
    group: Group;
    role: string;
    isBlocked: boolean;
};

type ShortUser = {
    id: string;
    fullName: string;
    role: Roles;
};

type File = {
    id: string;
    name: string;
};

export type Pass = {
    id: string;
    user: ShortUser;
    dateStart: Date;
    dateEnd: Date;
    minioFiles: File[];
    extendPassTimeRequests: Pass[];
    isAccepted: boolean;
    createTimeStamp: Date;
};

export type Pageable = {
    page: number;
    size: number;
    sort: string;
};

export type Error = { [key: string]: string };
