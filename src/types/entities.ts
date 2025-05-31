export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: User;
}

export interface User extends BaseEntity {
    username: string;
    email: string;
    balance?: number;
}

export interface RegisterUserForm {
    username: string;
    email: string;
    password: string;
}
