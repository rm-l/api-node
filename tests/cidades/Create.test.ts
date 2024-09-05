import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Tenta criar registro sem autenticação', async () => {
        const response = await testServer
            .post('/cidades')
            .send({
                nome: 'Belo Horizonte'
            });

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors.default');
    });

    it('Criar registro', async () => {
        const response = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'Belo Horizonte'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response.body).toEqual('number');
    });

    it('Tenta criar um registro com nome inferior a 3 caracteres', async () => {
        const response = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'ah'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');
    });
});
