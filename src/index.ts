import { server } from './server/server';
import 'dotenv/config';

const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`Listening on port ${port}`));
