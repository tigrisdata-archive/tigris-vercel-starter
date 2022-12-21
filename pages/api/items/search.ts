import { NextApiRequest, NextApiResponse } from 'next';
import { ITEMS_COLLECTION_NAME, TodoItem } from '../../../models/tigris/todoItems';
import { SearchRequest } from '@tigrisdata/core';
import tigrisDb from '../../../lib/tigris';

type Data = {
  result?: Array<TodoItem>;
  error?: string;
};

// GET /api/items/search?q=searchQ -- searches for items matching text `searchQ`
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // TODO: Implement me
}
