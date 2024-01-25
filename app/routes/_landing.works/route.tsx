import type { MetaFunction } from "@remix-run/cloudflare";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Card } from "./card";

import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "Works - hiz" }, { name: "description", content: "Works" }];
};

const works = [
  {
    id: "1",
    title: "airbeat",
    description: "Offline first metronome application.",
    url: "https://airbeat.hizapp.blue/",
    image: "/images/icon-airbeat.svg",
  },
  {
    id: "2",
    title: "Giji one",
    description:
      "A tool for the assistance of people in the creation of meeting minutes.",
    url: "https://gijione.hizapp.blue/",
    image: "/images/icon-gijione.svg",
  },
  {
    id: "3",
    title: "Cinemasaurus",
    description: "沖縄県内の映画情報サイト",
    url: "https://cinemasaurus.net/",
    image: "/images/icon-cinemasaurus.svg",
  },
];

export default function Index() {
  return (
    <div>
      <Headline>
        <Icon type="works" />
        Works
      </Headline>
      <div className={styles.cardHolder}>
        {works.reverse().map((work) => (
          <Card key={work.id} {...work} />
        ))}
      </div>
    </div>
  );
}
