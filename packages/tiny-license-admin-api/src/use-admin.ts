import { Express, Router } from "express";
/**
 * Configure Admin/Api
 */
export default () => async <A extends Express | Router>(app: A): Promise<A> => {
  const { middleware: auth } = await import("./auth");
  const { authorize, requireRole } = auth;
  const prefix = "/api";
  // ...
  {
    const {
      configure: products,
    } = await import("@australis/tiny-license-controller-product");
    const confgiure = products({
      prefix: `${prefix}/products`,
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "dowmload"])],
      },
    });
    await confgiure(app);
  }
  // ...
  {
    const {
      configure: customers,
    } = await import("@australis/tiny-license-controller-customer");
    const configure = customers({
      prefix: `${prefix}/customers`,
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "dowmload"])],
      },
    });
    configure(app); ``
  }
  // ...
  {
    app.use("/api/license", (req, _res, next) => {
      console.log(req.path);
      next();
    });
    const {
      configure: licenses,
    } = await import("@australis/tiny-license-controller-license");
    const configure = licenses({
      issuer: process.env.TINY_LICENSEWARE_ISSUER,
      secret: process.env.TINY_LICENSEWARE_SECRET,
      // Validator URL added to license
      baseUrl: process.env.TINY_LICENSEWARE_HOST_BASE,
      prefix: `${prefix}/license`,      
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "download"])],
      },
      deliver: {
        before: [authorize, requireRole(["user"])],
      },
      validate: {
        // before: [requireRole(["user"])],
      }
    });
    configure(app);
  }
  return app;
};
