import { execSync } from "node:child_process";
import { Resource } from "sst";

const arg = process.argv[2];
const command = `cd ./migrations && GOOSE_DRIVER=turso GOOSE_DBSTRING=${Resource.TursoDbUrl.value}?authToken=${Resource.TursoToken.value} goose ${arg}`;

const output = execSync(command);

console.log(output.toString());
