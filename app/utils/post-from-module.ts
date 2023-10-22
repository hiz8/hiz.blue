type Post = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
};

export function postFromModule(mod: any): Post {
  // mod.filename の _landing.blog._detail.YYYYMMDD.mdx から日付部分のみを抽出して slug に設定する
  const slug = mod.filename.match(/_landing.blog._detail.(\d{8}).mdx?$/)[1];

  // slug から YYYY-MM-DD 形式の日付を生成する
  const date = `${slug.slice(0, 4)}-${slug.slice(4, 6)}-${slug.slice(6, 8)}`;

  return {
    title: mod.attributes.meta[0].title,
    excerpt: mod.attributes.excerpt,
    date,
    slug,
    ...mod.attributes.meta,
  };
}
