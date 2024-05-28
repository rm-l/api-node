import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Delete', () => {
    it('Excluir um registro', async () => {
        const response = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseDelete = await testServer
            .delete('/pessoas/1');

        expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta excluir um registro inexistente', async () => {
        const response = await testServer
            .delete('/pessoas/0')
            .send();

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.params.id');
    });
});
