import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

    it('Atualiza registro', async () => {

        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const resopnseUpdate = await testServer
            .put('/pessoas/1')
            .send({
                nome: 'Teste',
                email: 'teste@teste.com',
                cidadeId: '1'
            });

        expect(resopnseUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta editar um registro com nome inferior a 3 caracteres', async () => {
        const response = await testServer
            .put('/pessoas/1')
            .send({
                nome: 'ah'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');

    });
});

