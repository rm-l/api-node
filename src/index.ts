import { server } from './server/Server';
import 'dotenv/config';

const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`Listening on port ${port}`));
