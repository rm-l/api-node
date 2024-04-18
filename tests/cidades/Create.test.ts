import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Create', () => {
    it('Criar registro', async () => {
        const response = await testServer
            .post('/cidades')
            .send({
                nome: 'Belo Horizonte'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response.body).toEqual('object');

    });
    it('Tenta criar um registro com nome inferior a 3 caracteres', async () => {
        const response = await testServer
            .post('/cidades')
            .send({
                nome: 'ah'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');

    });
});
