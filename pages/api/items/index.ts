import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllItems, insertItem } from '../../../lib/repository'
import { TodoItem } from '../../../lib/schema'

type Response = {
  result?: Array<TodoItem>,
  error?: string
}

// GET /api/items?limit=10&skip=1 -- gets a page of items from DB
// POST /api/items {ToDoItem} -- inserts a new item to DB
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      break
    case 'POST':
      await handlePost(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function handleGet (req: NextApiRequest,
  res: NextApiResponse<Response>) {
  try {
    const limit = Number(req.query["limit"]) || 20
    const skip = Number(req.query["skip"]) || 0
    const items = await getAllItems(limit, skip)
    res.status(200).json({ result: items })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

async function handlePost (req: NextApiRequest,
  res: NextApiResponse<Response>) {
  try {
    const item = await insertItem(req.body)
    res.status(200).json({ result: [item] })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
