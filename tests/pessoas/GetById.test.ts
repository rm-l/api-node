import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

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
            .post('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: 'Alberto',
                email: 'alberto@teste.com',
                cidadeId: '1'
            });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseGet = await testServer
            .get('/pessoas/1')
            .set({ Authorization: `Bearer ${token}` })
            .send();

        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body).toHaveProperty('nome');
        expect(responseGet.body).toHaveProperty('email');
        expect(responseGet.body).toHaveProperty('cidadeId');
    });

    it('Tenta buscar um registro com ID 0', async () => {
        const response = await testServer
            .get('/pessoas/0')
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});

