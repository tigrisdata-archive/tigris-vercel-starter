import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllItems } from '../../lib/repository'
import { TodoItem } from '../../lib/schema'

type Data = {
  results: object,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const lists: Array<TodoItem> = await getAllItems();
  res.status(200).json({results: lists});
}
