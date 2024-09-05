import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {

    let token = '';

    beforeAll(async () => {
        const email = 'conta@teste.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: 'laele5573' });
        const singInRes = await testServer.post('/entrar').send({ email: email, senha: 'laele5573' });
        token = singInRes.body.accessToken;
        console.log(singInRes.body.accessToken);
    });

    it('Listar registros', async () => {
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
            .get('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .send();

        expect(Number(responseGet.header['x-total-count'])).toBeGreaterThan(0);
        expect(responseGet.statusCode).toEqual(StatusCodes.OK);
        expect(responseGet.body.length).toBeGreaterThan(0);
    });
});
