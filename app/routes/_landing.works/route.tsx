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
    title: "VS Code Ruby Blue Theme",
    description: "Dark, high contrast theme for VS Code.",
    url: "https://marketplace.visualstudio.com/items?itemName=hirofumii.rubyblue-theme",
    image: "/images/icon-ruby-blue-theme.png",
  },
  {
    id: "2",
    title: "Noto Sans CJK JP min",
    description: "Subset of the Noto Sans CJK JP for the size down.",
    url: "https://hiz8.github.io/Noto-Sans-CJK-JP.min/",
  },
  {
    id: "3",
    title: "Noto Serif CJK JP min",
    description: "Subset of the Noto Selif CJK JP for the size down.",
    url: "https://hiz8.github.io/Noto-Serif-CJK-JP.min/",
  },
  {
    id: "4",
    title: "airbeat",
    description: "Offline first metronome application.",
    url: "https://airbeat.hizapp.blue/",
    image: "/images/icon-airbeat.svg",
  },
  {
    id: "5",
    title: "Giji one",
    description:
      "A tool for the assistance of people in the creation of meeting minutes.",
    url: "https://gijione.hizapp.blue/",
    image: "/images/icon-gijione.svg",
  },
  {
    id: "6",
    title: "Cinemasaurus",
    description: "沖縄県内の映画情報サイト",
    url: "https://cinemasaurus.net/",
    image: "/images/icon-cinemasaurus.svg",
  },
];

const arcives = [
  {
    id: "1",
    title: "NAUTILUS OFFICIAL WEBSITE",
    description: "NAUTILUS の公式ウェブサイト",
    url: "https://nautilus-jp.com/",
  },
  {
    id: "2",
    title: "宜野湾 HUMAN STAGE",
    description: "宜野湾 HUMAN STAGE の公式ウェブサイト",
    url: "https://www.humanstage.net/",
  },
  {
    id: "3",
    title: "Playlog",
    description: "Webフロントエンドについて徒然と",
    url: "https://log.plyrs.net/",
  },
  {
    id: "4",
    title: "Playground",
    description: "Playground for Future of Web Technology.",
    url: "https://ground.plyrs.net/",
  },
  {
    id: "5",
    title: "hexo-theme-amp",
    description: "A simple and mobile first Hexo template on AMP ⚡ HTML.",
    url: "https://hiz8.github.io/hexo-theme-amp/",
  },
  {
    id: "7",
    title: "Spectacle Boilerplate SWC",
    description: "Spectacle Boilerplate based on SWC for high speed.",
    url: "https://github.com/hiz8/spectacle-presentation-swc",
  },
];

export default function Index() {
  return (
    <>
      <Headline>
        <Icon type="works" />
        Works
      </Headline>
      <div className={styles.cardHolder}>
        {works.sort(sortById).map((work) => (
          <Card key={work.id} {...work} />
        ))}
      </div>

      <Headline level={2}>Legacy/Archived</Headline>
      <div className={styles.cardHolder}>
        {arcives.sort(sortById).map((work) => (
          <Card key={work.id} {...work} />
        ))}
      </div>
    </>
  );
}

const sortById = (a: { id: string }, b: { id: string }) =>
  a.id < b.id ? 1 : -1;
