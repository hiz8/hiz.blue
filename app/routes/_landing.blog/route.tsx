import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "Blog - hiz" }, { name: "description", content: "Blog" }];
};

export default function Index() {
  return <div>Under construction.</div>;
}
