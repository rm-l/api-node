import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
    nome: string;
    estado: string;
}

export const createValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(3)
    }),
    query: yup.object().shape({
        teste: yup.string().required().min(5)
    })
}
);

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

    console.log(req.body);
    return res.send('Created!');

};
