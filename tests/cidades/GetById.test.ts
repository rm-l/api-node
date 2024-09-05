import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - GetById', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Busca registro por id', async () => {

        const response = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${token}` })
            .send({ nome: 'Belo Horizonte' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/cidades/1')
            .set({ Authorization: `Bearer ${token}` })
            .send();

        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body).toHaveProperty('nome');
    });

    it('Tenta buscar um registro com ID 0', async () => {
        const response = await testServer
            .get('/cidades/0')
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});

