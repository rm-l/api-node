import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';


export const authenticationCheck: RequestHandler = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    return next();
};
