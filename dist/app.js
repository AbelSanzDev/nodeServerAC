"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
const envs_1 = require("./config/envs");
(() => {
    main();
})();
async function main() {
    const server = new server_1.Server({ port: envs_1.envs.PORT, public_path: envs_1.envs.PUBLIC_PATH });
    server.start();
}
