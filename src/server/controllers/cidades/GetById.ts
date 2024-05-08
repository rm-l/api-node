import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation({
    params: yup.object().shape({
        id: yup.number().integer().required().moreThan(0),

    }),
}
);

export const getById = async (req: Request<IParamProps>, res: Response) => {

    const result = await CidadesProvider.getById(req.params.id!);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    if (result.length === 0) {
        return res.status(StatusCodes.OK).json('Nenhuma cidade correspondente ao id informado.');
    }

    console.log('Buscando cidade(s) por id');
    return res.status(StatusCodes.OK).json(result);

};
