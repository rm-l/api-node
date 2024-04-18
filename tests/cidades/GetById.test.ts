import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - GetById', () => {

    it('Busca registro por id', async () => {

        const response = await testServer
            .post('/cidades')
            .send({ nome: 'Belo Horizonte' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/cidades/1')
            .send();

        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body).toHaveProperty('nome');
    });

    it('Tenta buscar um registro com ID 0', async () => {
        const response = await testServer
            .get('/cidades/0');

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    });
});

