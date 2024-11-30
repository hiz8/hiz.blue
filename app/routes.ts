import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
  layout("routes/_landing/route.tsx", [
    index("routes/_landing._index/route.tsx"),
    route("blog", "routes/_landing.blog._index/route.tsx"),
    route("blog/:slug", "routes/_landing.blog.$slug/route.tsx"),
    route("works", "routes/_landing.works/route.tsx"),
    route("about", "routes/_landing.about.tsx"),
  ]),
] satisfies RouteConfig;
