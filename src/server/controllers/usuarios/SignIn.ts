import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { PasswordCrypto } from '../../shared/utils';


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const signInValidation = validation({
    body: yup.object().shape({
        email: yup.string().required().email(),
        senha: yup.string().required().min(6)
    }),
}
);

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body;
    console.log('Tentando login');

    const result = await UsuariosProvider.getByEmail(email);
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    } else {
        console.log('Logando usuario');
        return res.status(StatusCodes.OK).json({ accessToken: 'teste' });
    }
};
