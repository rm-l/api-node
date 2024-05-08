import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
    id?: number;
}

export const deleteByIdValidation = validation({
    params: yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),

    }),
}
);

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

    const result = await CidadesProvider.deleteById(req.params.id!);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log('Deletando cidade');
    return res.status(StatusCodes.NO_CONTENT).send();

};
