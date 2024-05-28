import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

    it('Busca registro por id', async () => {

        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/pessoas/1')
            .send();

        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body).toHaveProperty('nome');
        expect(responseGet.body).toHaveProperty('email');
        expect(responseGet.body).toHaveProperty('cidadeId');
    });

    it('Tenta buscar um registro com ID 0', async () => {
        const response = await testServer
            .get('/pessoas/0');

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});

