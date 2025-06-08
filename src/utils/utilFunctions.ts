import { ICheck, ICheckForm } from '@src/types/entities';
import { ApiError, ApiResponse } from '../types/types';

export const checkResponseException = (
    res: Response,
    resObject: ApiResponse<unknown>
) => {
    if (!res.ok) {
        throw new ApiError({
            statusCode: res.status,
            message: resObject.errorMessage,
            code: resObject.errorCode
        });
    }
};

export const checkToCheckForm = (check: ICheck): ICheckForm => {
    return { id: check.id, name: check.name, url: check.url };
};
