"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const port = 3333;
server_1.app.listen(port, () => console.log(`Listening on port ${port}`));
