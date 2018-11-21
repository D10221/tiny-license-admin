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
  {
    // Validate :       
    const {
      configure,
    } = await import("@australis/tiny-license-controller-validate");
    configure({
      path: `${prefix}/license/validate`,
      issuer: process.env.TINY_LICENSEWARE_ISSUER,
      secret: process.env.TINY_LICENSEWARE_SECRET,
      before: (req, _res, next) => {
        console.log("VaLIDATE %s %s", req.method, req.path);
        next();
      }
    })(app);
  }
  {
    // Download : 
    const {
      configure,
    } = await import("@australis/tiny-license-controller-dwnld");
    configure({
      path: `${prefix}/license/download`,
      fileName: "license.lic",
      before: [authorize, requireRole(["admin", "download"])],
    })(app);
  }
  {
    // Deliver :     
    const {
      configure,
    } = await import("@australis/tiny-license-controller-deliver");
    configure({
      path: `${prefix}/license/deliver`,
      issuer: process.env.TINY_LICENSEWARE_ISSUER,
      secret: process.env.TINY_LICENSEWARE_SECRET,
      before: [authorize, requireRole(["user"])],
    })(app);
  }
  {
    // PUT : sign    
    const {
      configure,
    } = await import("@australis/tiny-license-controller-sign");
    configure({
      path: `${prefix}/license`,
      issuer: process.env.TINY_LICENSEWARE_ISSUER,
      secret: process.env.TINY_LICENSEWARE_SECRET,
      validatorUrl: process.env.TINY_LICENSEWARE_VALIDATOR_URL,
      before: [authorize, requireRole(["admin"])],
    })(app);
  }
  // ...
  {
    // ...crud : read/update/delete, ...not add|put
    const {
      configure: licenses,
    } = await import("@australis/tiny-license-controller-license");
    const configure = licenses({
      path: `${prefix}/license`,
      get: {
        before: [(req, _res, next) => {
          console.log(req.path);
          next();
        },
          authorize,
        requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      }
    });
    configure(app);
  }
  return app;
};
