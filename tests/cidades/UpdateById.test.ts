import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - UpdateById', () => {

    it('Atualiza registro', async () => {

        const response = await testServer
            .post('/cidades')
            .send({ nome: 'Belo Horizonte' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const resopnseUpdate = await testServer
            .put('/cidades/1')
            .send({ nome: 'Teste' });

        expect(resopnseUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta editar um registro com nome inferior a 3 caracteres', async () => {
        const response = await testServer
            .put('/cidades/1')
            .send({
                nome: 'ah'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');

    });
});

