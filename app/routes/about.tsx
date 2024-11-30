import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "About - hiz" }, { name: "description", content: "About" }];
};

export default function Index() {
  return <div>Under construction.</div>;
}
