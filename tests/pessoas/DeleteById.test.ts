import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Delete', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Excluir um registro', async () => {
        const response = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseDelete = await testServer
            .delete('/pessoas/1')
            .set({ Authorization: `Bearer ${token}` });

        expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta excluir um registro inexistente', async () => {
        const response = await testServer
            .delete('/pessoas/0')
            .set({ Authorization: `Bearer ${token}` })
            .send();

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.params.id');
    });
});
