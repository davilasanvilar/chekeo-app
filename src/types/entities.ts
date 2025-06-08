export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: IUser;
}

export interface IUser extends BaseEntity {
    username: string;
    email: string;
    balance?: number;
}

export interface ILoginResponse {
    authToken: string;
    sessionId: string;
}

export interface IRegisterUserForm {
    username: string;
    email: string;
    password: string;
}

export interface IProject extends BaseEntity {
    name: string;
    checks: ICheck[]
}

export interface IProjectForm {
    name: string;
    checks: ICheckForm[]
}

export interface ISearchProjectForm {
    name?: string;
    userId?: string;
}


export interface ICheck extends BaseEntity {
    name: string;
    url: string;
    frequency: number;
    lastResult: ICheckResult;
}

export type FrequencyUnitType = 'h' | 'm'

export interface ICheckForm {
    id?: string;
    name: string;
    url: string;
    frequency: number;
    frequencyType: FrequencyUnitType
}

export interface ICheckResult extends BaseEntity {
    status: number;
    info: string;
}