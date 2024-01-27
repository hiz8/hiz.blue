import { isFullDatabase, isFullPage } from "@notionhq/client";

type NotionResponse = Parameters<typeof isFullDatabase>[0];

export type Post = {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
};

function getProperty(data: NotionResponse, name: string) {
  if (!isFullPage(data)) {
    throw new Error("Invalid data");
  }

  const property = data.properties[name];

  if (property.type === "rich_text") {
    return property.rich_text?.[0]?.plain_text;
  }
  if (property.type === "title") {
    return property.title?.[0]?.plain_text;
  }

  throw new Error("Invalid data");
}

export function postFromNotionResponse(data: NotionResponse): Post {
  if (!isFullPage(data)) {
    throw new Error("Invalid data");
  }

  const title = getProperty(data, "Page");
  const slug = getProperty(data, "Slug");
  const excerpt = getProperty(data, "Excerpt");
  const date = data.created_time;

  return {
    id: data.id,
    title,
    date,
    slug,
    excerpt,
  };
}
