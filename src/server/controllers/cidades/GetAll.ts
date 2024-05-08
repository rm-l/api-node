import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

export const getAllValidation = validation({
    query: yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),

    }),
}
);


export const getAll = async (req: Request, res: Response) => {
    const result = await CidadesProvider.getAll();
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log('Buscando cidades');
    return res.status(StatusCodes.OK).json(result);

};
