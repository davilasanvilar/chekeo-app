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

export interface LoginResponse {
  authToken: string;
  sessionId: string;
}

export interface RegisterUserForm {
    username: string;
    email: string;
    password: string;
}

export interface Project extends BaseEntity {
    name:string;
    checks: Check[]
}

export interface SearchProjectForm {
    name?:string;
    userId?:string;
}

export interface Check extends BaseEntity {
    name:string;
    url: string;
    lastResult: CheckResult;
}

export interface CheckResult extends BaseEntity {
    status: number;
    info: string;
}