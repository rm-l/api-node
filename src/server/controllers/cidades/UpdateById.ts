import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
    id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'> { }


export const updateByIdValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3),

    }),
    params: yup.object().shape({
        id: yup.number().integer().required().moreThan(0),

    }),
}
);

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    const result = await CidadesProvider.updateById(req.body, req.params.id!);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.NO_CONTENT).send();

};
