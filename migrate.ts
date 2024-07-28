import { execSync } from "node:child_process";
import { Resource } from "sst";

const [_one, _two, ...args] = process.argv;
const command = `cd ./migrations && GOOSE_DRIVER=turso GOOSE_DBSTRING=${
  Resource.TursoDbUrl.value
}?authToken=${Resource.TursoToken.value} goose ${args.join(" ")}`;

const output = execSync(command);

console.log(output.toString());
