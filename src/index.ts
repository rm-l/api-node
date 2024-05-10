import { Knex } from './server/database/knex';
import { server } from './server/Server';
import 'dotenv/config';

const port = process.env.PORT || 3333;

const startServer = () => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
};

if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest().then(() => {
        startServer();
    }).catch(console.log);

} else {
    startServer();
}


