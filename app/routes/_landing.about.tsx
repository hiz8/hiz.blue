import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "About - hiz" }, { name: "description", content: "About" }];
};

export default function Index() {
  return <div>Under construction.</div>;
}
