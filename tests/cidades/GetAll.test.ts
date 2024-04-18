import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - GetAll', () => {
    it('Listar registros', async () => {
        const response = await testServer
            .post('/cidades')
            .send({ nome: 'Belo Horizonte' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/cidades')
            .send();

        expect(Number(responseGet.header['x-total-count'])).toBeGreaterThan(0);
        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body.length).toBeGreaterThan(0);

    });
});
