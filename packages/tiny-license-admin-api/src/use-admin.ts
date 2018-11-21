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
      issuer: "localhost",
      secret: process.env.TINY_LICENSEWARE_SECRET,
      baseUrl: process.env.HOST_BASE,
      prefix: `${prefix}/license`,
      before: authorize,
      get: {
        before: [requireRole(["admin"])],
      },
      put: {
        before: [requireRole(["admin"])],
      },
      post: {
        before: [requireRole(["admin"])],
      },
      del: {
        before: [requireRole(["admin", "delete"])],
      },
      download: {
        before: [requireRole(["admin", "download"])],
      },
      deliver: {
        before: [requireRole(["user"])],
      },
      validate: {
        before: [requireRole(["user"])],
      }
    });
    configure(app);
  }
  return app;
};
