import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
    it('Criar registro', async () => {
        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response.body).toEqual('number');

    });

    it('Tenta criar um registro com nome inferior a 3 caracteres', async () => {
        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'A',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');
    });
});
