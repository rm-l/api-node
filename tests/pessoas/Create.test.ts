import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Criar registro', async () => {
        const response = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
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
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'A',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');
    });
});
