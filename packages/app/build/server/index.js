import { jsx, jsxs } from "react/jsx-runtime";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { env } from "cloudflare:workers";
async function handleRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(ServerRouter, { context: entryContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router on Cloudflare!"
  }];
}
async function loader({
  context
}) {
  return {
    envVar: env.EXAMPLE_VAR
  };
}
const home = UNSAFE_withComponentProps(function Home({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      fontFamily: "system-ui, sans-serif",
      lineHeight: "1.8",
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */ jsx("h1", {
      style: {
        fontSize: "2.5rem",
        marginBottom: "1rem"
      },
      children: "Welcome to React Router v7"
    }), /* @__PURE__ */ jsx("p", {
      style: {
        fontSize: "1.2rem",
        color: "#666"
      },
      children: "This application is configured for Cloudflare deployment."
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginTop: "2rem"
      },
      children: [/* @__PURE__ */ jsx("h2", {
        style: {
          fontSize: "1.8rem",
          marginBottom: "1rem"
        },
        children: "Features"
      }), /* @__PURE__ */ jsxs("ul", {
        style: {
          fontSize: "1.1rem"
        },
        children: [/* @__PURE__ */ jsx("li", {
          children: "React Router v7"
        }), /* @__PURE__ */ jsx("li", {
          children: "Server-Side Rendering (SSR)"
        }), /* @__PURE__ */ jsx("li", {
          children: "Cloudflare Workers deployment"
        }), /* @__PURE__ */ jsx("li", {
          children: "TypeScript support"
        }), /* @__PURE__ */ jsxs("li", {
          children: ["Environment variables: ", loaderData.envVar]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1rem",
        background: "#f0f0f0",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */ jsx("h3", {
        style: {
          marginTop: 0
        },
        children: "Getting Started"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Edit ", /* @__PURE__ */ jsx("code", {
          children: "app/routes/home.tsx"
        }), " to customize this page."]
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BjT9gUH9.js", "imports": ["/assets/chunk-NISHYRIK-D5S-UwoE.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-E_JViLGW.js", "imports": ["/assets/chunk-NISHYRIK-D5S-UwoE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C8ILDbvl.js", "imports": ["/assets/chunk-NISHYRIK-D5S-UwoE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-8ba7f334.js", "version": "8ba7f334", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
