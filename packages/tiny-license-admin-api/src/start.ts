import { Express } from "express";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** START */
const start = (options?: { port: number }) => {
    /** */
    let { port } = require("minimist")(process.argv.slice(2));
    const defaultOptions = {
        port: Number(port || process.env.PORT) || 5000
    };
    debug(defaultOptions);
    return async (app: Express) => new Promise((resolve, reject) => {        
        const { port } = { ...defaultOptions, ...(options || defaultOptions) };
        if (!port) {
            return reject("NO PORT specified");
        }
        app.listen(port, ((error: any) => {
            if (error) {
                return reject(error);
            }
            debug(`listening on PORT=${port}`);
            debug(`pid=${process.pid}`);
            return resolve();
        }));
        return app;
    })
}
export default start;