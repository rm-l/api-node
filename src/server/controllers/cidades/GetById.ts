import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

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

    console.log(req.params);
    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        nome: 'Belo Horizonte',
    });

};
