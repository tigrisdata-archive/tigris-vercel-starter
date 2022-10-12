import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllLists, ToDoList } from '../../lib/api/repository'

type Data = {
  results: object,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const lists: Array<ToDoList> = await getAllLists();
  res.status(200).json({results: lists});
}
