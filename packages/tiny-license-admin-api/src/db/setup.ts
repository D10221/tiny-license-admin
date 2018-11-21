/**
 * Dont Export me! from index
 */
const log = console.log.bind(console);
(async () => {
    try {
        require("dotenv").load({ path: process.env.ENV_PATH || ".env" });
        const { default: init } = await import("./init");
        return init();
    } catch (error) {
        return Promise.reject(error)
    }
})()
    .then(_ => {
        log("Done!");
        process.exit();
    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    });