import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, PessoasController, UsuariosController } from './../controllers';
import { authenticationCheck } from '../shared/middleware';

const router = Router();

router.get('/', (req, res) => {
    return res.status(StatusCodes.OK).send('Rota / ---- Hi!');
});

router.get('/cidades', authenticationCheck, CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', authenticationCheck, CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', authenticationCheck, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', authenticationCheck, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', authenticationCheck, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', authenticationCheck, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', authenticationCheck, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', authenticationCheck, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', authenticationCheck, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', authenticationCheck, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);

export { router };
