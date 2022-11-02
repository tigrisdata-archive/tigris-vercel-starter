import type { NextApiRequest, NextApiResponse } from 'next';
import { COLLECTION_NAME, TodoItem } from '../../../models/tigris/todoStarterApp/todoItems';
import tigrisDb from '../../../lib/tigris';

type Response = {
  result?: Array<TodoItem>;
  error?: string;
};

// GET /api/items -- gets items from collection
// POST /api/items {ToDoItem} -- inserts a new item to collection
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO: Implement me
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO: Implement me
}
