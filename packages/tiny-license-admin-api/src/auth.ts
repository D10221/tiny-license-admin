import Auth, { configure } from "@australis/tiny-auth"
const auth = Auth(process.env.TINY_AUTH_SECRET);
const { middleware, controllers } = auth;
export {
    middleware,
    controllers,
    configure
}