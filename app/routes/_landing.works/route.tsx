import type { MetaFunction } from "@remix-run/cloudflare";

import { Headline } from "~/components/headline";
import { Icon } from "~/components/icon";
import { Card } from "./card";

import * as styles from "./route.css";

export const meta: MetaFunction = () => {
  return [{ title: "Works - hiz" }, { name: "description", content: "Works" }];
};

type Work = {
  id: string;
  title: string;
  description: string;
  urls: {
    type: "website" | "github";
    url: string;
  }[];
  image?: string;
};

const works: Work[] = [
  {
    id: "1",
    title: "VS Code Ruby Blue Theme",
    description: "Dark, high contrast theme for VS Code.",
    urls: [
      {
        type: "website",
        url: "https://marketplace.visualstudio.com/items?itemName=hirofumii.rubyblue-theme",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/vscode-theme-rubyblue",
      },
    ],
    image: "/images/icon-ruby-blue-theme.png",
  },
  {
    id: "2",
    title: "Noto Sans CJK JP min",
    description: "Subset of the Noto Sans CJK JP for the size down.",
    urls: [
      {
        type: "website",
        url: "https://hiz8.github.io/Noto-Sans-CJK-JP.min/",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/Noto-Sans-CJK-JP.min",
      },
    ],
  },
  {
    id: "3",
    title: "Noto Serif CJK JP min",
    description: "Subset of the Noto Selif CJK JP for the size down.",
    urls: [
      {
        type: "website",
        url: "https://hiz8.github.io/Noto-Serif-CJK-JP.min/",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/Noto-Serif-CJK-JP.min",
      },
    ],
  },
  {
    id: "4",
    title: "airbeat",
    description: "Offline first metronome application.",
    urls: [
      {
        type: "website",
        url: "https://airbeat.hizapp.blue/",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/airbeat",
      },
    ],
    image: "/images/icon-airbeat.svg",
  },
  {
    id: "5",
    title: "Giji one",
    description:
      "A tool for the assistance of people in the creation of meeting minutes.",
    urls: [
      {
        type: "website",
        url: "https://gijione.hizapp.blue/",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/giji-one",
      },
    ],
    image: "/images/icon-gijione.svg",
  },
  {
    id: "6",
    title: "Cinemasaurus",
    description: "沖縄県内の映画情報サイト",
    urls: [
      {
        type: "website",
        url: "https://cinemasaurus.net/",
      },
    ],
    image: "/images/icon-cinemasaurus.svg",
  },
];

const arcives: Work[] = [
  {
    id: "1",
    title: "NAUTILUS OFFICIAL WEBSITE",
    description: "NAUTILUS の公式ウェブサイト",
    urls: [
      {
        type: "website",
        url: "https://nautilus-jp.com/",
      },
    ],
  },
  {
    id: "2",
    title: "宜野湾 HUMAN STAGE",
    description: "宜野湾 HUMAN STAGE の公式ウェブサイト",
    urls: [
      {
        type: "website",
        url: "https://www.humanstage.net/",
      },
    ],
  },
  {
    id: "3",
    title: "Playlog",
    description: "Webフロントエンドについて徒然と",
    urls: [
      {
        type: "website",
        url: "https://log.plyrs.net/",
      },
      {
        type: "github",
        url: "https://github.com/plyrs/plylog",
      },
    ],
  },
  {
    id: "4",
    title: "Playground",
    description: "Playground for Future of Web Technology.",
    urls: [
      {
        type: "website",
        url: "https://ground.plyrs.net/",
      },
      {
        type: "github",
        url: "https://github.com/plyrs/plyground",
      },
    ],
  },
  {
    id: "5",
    title: "hexo-theme-amp",
    description: "A simple and mobile first Hexo template on AMP ⚡ HTML.",
    urls: [
      {
        type: "website",
        url: "https://hiz8.github.io/hexo-theme-amp/",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/hexo-theme-amp",
      },
    ],
  },
  {
    id: "7",
    title: "Spectacle Boilerplate SWC",
    description: "Spectacle Boilerplate based on SWC for high speed.",
    urls: [
      {
        type: "website",
        url: "https://github.com/hiz8/spectacle-presentation-swc",
      },
      {
        type: "github",
        url: "https://github.com/hiz8/spectacle-presentation-swc",
      },
    ],
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
