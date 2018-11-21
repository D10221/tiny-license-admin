import cors from "cors";
import { Express } from "express";
import helmet from "helmet";
import { debugModule } from "@australis/create-debug";

const debug = debugModule(module);
/** */
export type Plugin = (app: Express) => any;
/**
 *
 * @param app
 */
export default () => (app: Express) => {
  /** */
  return new Promise(async (resolve, reject) => {
    try {
      /** Middleware */
      app.use(
        cors({
          origin: process.env.CORS_ORIGIN || "*",
          methods: "*",
          credentials: true,
        }),
      );
      app.use(helmet());
      {
        const { configure } = await import("./auth");
        await configure(process.env.TINY_AUTH_SECRET, {
          prefix: "/api/auth"
        })(app);
      }
      {
        const { default: admin } = await import("./use-admin");
        await admin()(app);
      }
      {
        const { default: useUi } = await import("./use-ui");
        const { resolve } = await import("path");
        await useUi({
          uiPath: resolve(__dirname, "../../app-ui/build"),
          /* defaultDocument: "index.html" */
        })(app);
      }
      // Errors
      const {
        default: errorHandler,
      } = await import("@australis/express-plain-text-error-handler");
      app.use((error: any, _req: any, _res: any, next: any) => {
        next(error);
      });
      app.use(errorHandler());
      debug("configured");
      return resolve();
    } catch (error) {
      debug(error);
      return reject(error);
    }
  });
};
