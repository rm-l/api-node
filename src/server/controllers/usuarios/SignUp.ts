import * as yup from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const signUpValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3).max(150),
        email: yup.string().required().email(),
        senha: yup.string().required().min(6)
    }),
}
);

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuariosProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    console.log(`Inserindo usuário "${req.body.nome}"`);
    return res.status(StatusCodes.CREATED).json(result);

};
