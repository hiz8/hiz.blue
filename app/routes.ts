import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout/index.tsx", [
    index("routes/home/index.tsx"),
    route("blog", "routes/blog/index.tsx"),
    route("blog/:slug", "routes/blog.$slug/index.tsx"),
    route("works", "routes/works/index.tsx"),
    route("about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
