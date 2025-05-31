import { conf } from '../conf';
import { ApiResponse, Page } from '../types/types';
import { checkResponseException } from '../utils/utilFunctions';
import { useAuth } from './useAuth';

interface CrudOperations<T> {
    create: (form: unknown) => Promise<T>;
    update: (id: string, form: unknown) => Promise<T>;
    get: (id: string) => Promise<T>;
    search: (
        page: number,
        pageSize: number | null,
        filters: SearchFilters
    ) => Promise<Page<T>>;
    remove: (id: string) => void;
}

type SearchFilters = { [key: string]: string | boolean | string[] };

export function useCrud<T>(entity: string): CrudOperations<T> {
    const apiUrl = conf.apiUrl;
    const { csrf } = useAuth();

    const create = async (form: unknown): Promise<T> => {
        const url = `${apiUrl}${entity}`;
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrf ? csrf : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<T> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };
    const update = async (id: string, form: unknown): Promise<T> => {
        const url = `${apiUrl}${entity}/${id}`;
        const options: RequestInit = {
            method: 'PATCH',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrf ? csrf : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<T> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };

    const get = async (id: string): Promise<T> => {
        const url = `${apiUrl}${entity}/${id}`;
        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrf ? csrf : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<T> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };

    const search = async (
        page: number,
        pageSize: number | null,
        filters: SearchFilters
    ) => {
        const body = { page, pageSize };
        Object.assign(body, filters);

        const url = `${apiUrl}${entity}/search`;
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrf ? csrf : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<Page<T>> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };

    const remove = async (id: string): Promise<void> => {
        const url = `${apiUrl}${entity}/${id}`;
        const options: RequestInit = {
            method: 'DELETE',
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrf ? csrf : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        checkResponseException(res, resObject);
    };

    const value: CrudOperations<T> = {
        create,
        update,
        get,
        search,
        remove
    };

    return value;
}
