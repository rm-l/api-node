import * as yup from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3).max(150),
        cidadeId: yup.number().integer().required().min(1),
        email: yup.string().required().email(),
    }),
}
);

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await PessoasProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log(`Inserindo a pessoa "${req.body.nome}"`);
    return res.status(StatusCodes.CREATED).json(result);
};
