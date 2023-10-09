import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "Works - hiz" }, { name: "description", content: "Works" }];
};

export default function Index() {
  return <div>Under construction.</div>;
}
