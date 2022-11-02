import { NextApiRequest, NextApiResponse } from 'next';
import { COLLECTION_NAME, TodoItem } from '../../../models/tigris/todoStarterApp/todoItems';
import { SearchRequest } from '@tigrisdata/core/dist/search/types';
import tigrisDb from '../../../lib/tigris';

type Data = {
  result?: Array<TodoItem>;
  error?: string;
};

// GET /api/items/search?q=searchQ -- searches for items matching text `searchQ`
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // TODO: Implement me
}
