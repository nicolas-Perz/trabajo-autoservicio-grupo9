import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
// Subimos 3 niveles: desde utils/index.js -> api -> src -> raíz
const __dirname = join(dirname(__filename), "../../../");

export {
    __dirname,
    join
};