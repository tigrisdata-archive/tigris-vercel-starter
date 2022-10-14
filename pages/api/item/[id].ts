import { NextApiRequest, NextApiResponse } from 'next'
import { deleteItem, getItem, updateItem } from '../../../lib/repository'
import { TodoItem } from '../../../lib/schema'

type Data = {
  result?: TodoItem,
  error?: string
}

// GET /api/item/[id] -- gets item from db where id = [id]
// PUT /api/item/[id] {ToDoItem} -- updates the item in table where id = [id]
// DELETE /api/item/[id] -- deletes the item in table where id = [id]
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  switch (req.method) {
    case 'GET':
      await handleGet(req, res, Number(id))
      break
    case 'PUT':
      await handlePut(req, res)
      break
    case 'DELETE':
      await handleDelete(req, res, Number(id))
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function handleGet (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  itemId: number
) {
  try {
    const item = await getItem(itemId)
    if (!item) {
      res.status(404)
    } else {
      res.status(200).json({ result: item })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

async function handlePut (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const item = req.body as TodoItem
    const updated = await updateItem(item)
    res.status(200).json({ result: updated })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

async function handleDelete (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  itemId: number
) {
  try {
    const status = (await deleteItem(itemId)).status
    if (status === 'deleted') {
      res.status(200)
    } else {
      res.status(400)
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
