import express from "express";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
const app = express();
(async () => {
    try {
        require("dotenv").load({ path: process.env.ENV_PATH || ".env" });
        if (process.env.INIT_DB && process.env.INIT_DB.toLowerCase() === "true") {
            const { init } = await import("./db");
            await init();
        }
        const { default: configure } = await import("./configure");
        const { default: start } = await import("./start");
        await configure()(app);
        await start()(app);
        debug("Started");
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
})();