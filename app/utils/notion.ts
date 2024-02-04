import { Client as NotionClient } from "@notionhq/client";
import type {
  PartialBlockObjectResponse,
  BlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Blocks = (PartialBlockObjectResponse | BlockObjectResponse)[];
export type Result = (
  | PageObjectResponse
  | PartialPageObjectResponse
  | DatabaseObjectResponse
  | PartialDatabaseObjectResponse
)[];

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
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    });
    return response.results;
  }

  async getDatabaseBySlug(databaseId: string, slug: string) {
    const response = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
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
