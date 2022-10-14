import { NextApiRequest, NextApiResponse } from 'next'
import { TodoItem } from '../../../lib/schema'
import { searchItems } from '../../../lib/repository'

type Data = {
  result?: Array<TodoItem>,
  error?: string
}

// GET /api/items/search?q=searchQ -- searches for items matching `searchQ`
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query['q']
  if (query === undefined) {
    res.status(400).json({ error: "No search query found in request" })
    return
  }
  try {
    const searchResult = await searchItems(query as string)
    const items = new Array<TodoItem>()
    for (const hit of searchResult.hits) {
      items.push(hit.document)
    }
    res.status(200).json({ result: items })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
