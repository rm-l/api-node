import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Delete', () => {
    it('Excluir um registro', async () => {
        const response = await testServer
            .post('/cidades')
            .send({ nome: 'Belo Horizonte' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseDelete = await testServer
            .delete(`/cidades/${response.body}`);

        expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });
    it('Tenta excluir um registro inexistente', async () => {
        const response = await testServer
            .delete('/cidades/0')
            .send();

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.params.id');

    });
});
