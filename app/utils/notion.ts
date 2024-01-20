import { Client as NotionClient } from "@notionhq/client";

export class Client {
  private notion: NotionClient;

  constructor(notionToken: string) {
    this.notion = new NotionClient({
      auth: notionToken,
    });
  }

  async getDatabase(databaseId: string) {
    const response = await this.notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  }

  async getDatabaseBySlug(databaseId: string, slug: string) {
    const response = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      throw new Error("Not found");
    }
    return response.results[0];
  }

  async getBlocks(blockId: string) {
    const response = await this.notion.blocks.children.list({
      block_id: blockId,
    });
    return response.results;
  }
}
