import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Atualiza registro', async () => {
        const response = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const resopnseUpdate = await testServer
            .put('/pessoas/1')
            .set({ Authorization: `Bearer ${token}` })
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
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'ah'
            });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');

    });
});

