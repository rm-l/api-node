import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {
    it('Listar registros', async () => {
        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/pessoas')
            .send();

        expect(Number(responseGet.header['x-total-count'])).toBeGreaterThan(0);
        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body.length).toBeGreaterThan(0);
    });
});
