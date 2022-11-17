import type { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTION_NAME, TodoItem } from '../../../models/tigris/tigris_netlify_starter/todoItems'
import { Collection } from '@tigrisdata/core'
import tigrisDb  from '../../../lib/tigris'
import { ReadRequestOptions } from '@tigrisdata/core/dist/types'

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
    const limit = Number(req.query['limit']) || 20
    const skip = Number(req.query['skip']) || 0

    const collection: Collection<TodoItem> = tigrisDb.getCollection(COLLECTION_NAME)
    const options = new ReadRequestOptions(limit, skip)
    const cursor = collection.findMany(undefined, undefined, undefined,
      options)
    const items = await cursor.toArray()
    res.status(200).json({ result: items })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

async function handlePost (req: NextApiRequest,
  res: NextApiResponse<Response>) {
  try {
    const item = JSON.parse(req.body) as TodoItem
    const collection: Collection<TodoItem> = tigrisDb.getCollection(COLLECTION_NAME)
    const inserted = await collection.insertOne(item)
    res.status(200).json({ result: [inserted] })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
