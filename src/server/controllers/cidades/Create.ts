import * as yup from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IBodyProps extends Omit<ICidade, 'id'> { }

export const createValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    }),
}
);

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await CidadesProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log(` Inserindo a cidade "${req.body.nome}"`);
    return res.status(StatusCodes.CREATED).json(result);

};
