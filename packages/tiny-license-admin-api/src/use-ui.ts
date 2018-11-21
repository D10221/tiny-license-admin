import { debugModule } from "@australis/create-debug";
import { Express, Router, static as serveStatic } from "express";
import { existsSync } from "fs";
import { resolve, isAbsolute } from "path";

const debug = debugModule(module);

const defaultOptions = {
  baseUrl: "/",
  uiPath: "./public",
  defaultDocument: "index.html",
};
/**
 * Call me Last!
 */
export default (options: Partial<typeof defaultOptions> = defaultOptions) => {
  let { uiPath, defaultDocument, baseUrl } = {
    ...defaultOptions,
    ...(options || defaultOptions),
  };
  uiPath = isAbsolute(uiPath) ? uiPath : resolve(process.cwd(), uiPath);
  const uiPathExists = existsSync(uiPath); 
  const defaultDocumentExists = existsSync(resolve(uiPath, defaultDocument));
  debug({
    uiPath,
    defaultDocument,
    uiPathExists,
    defaultDocumentExists
  });  
  const disabled = !uiPath || !uiPathExists || !baseUrl || !defaultDocumentExists;
  if(disabled) debug("Disabled!");
  /**
   * @returns configure
   */
  return async <A extends Express | Router>(app: A): Promise<A> => {
    if (disabled) return app;
    app.use(`${baseUrl}`, serveStatic(options.uiPath));            
    if (!defaultDocument || !defaultDocumentExists) {        
        return app;
    }    
    app.use("*", serveStatic(resolve(uiPath, defaultDocument)));
    debug("configured");
    return app;
  };
};
