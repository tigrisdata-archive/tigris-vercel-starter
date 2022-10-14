import { ReadRequestOptions } from '@tigrisdata/core/dist/types'
import tigris from './tigris'
import { Collection } from '@tigrisdata/core'
import { TodoItem } from './schema'
import { SearchResult } from '@tigrisdata/core/dist/search/types'

export const DB_NAME = 'tigris_vercel_starter'
export const COLLECTION_NAME = 'todoItems'

export async function getAllItems (limit = 20,
  skip = 0): Promise<Array<TodoItem>> {
  const db = tigris.getDatabase(DB_NAME)
  const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
  const options = new ReadRequestOptions(limit, skip)
  const cursor = collection.findMany(undefined, undefined, undefined,
    options)
  return cursor.toArray()
}

export async function getItem (itemId: number): Promise<TodoItem | undefined> {
  const db = tigris.getDatabase(DB_NAME)
  const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
  return collection.findOne({ id: itemId })
}

export async function insertItem (item: TodoItem): Promise<TodoItem> {
  const db = tigris.getDatabase(DB_NAME)
  const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
  return collection.insertOne(item)
}

export async function updateItem (item: TodoItem) {

}

export async function markCompleted (itemId: number) {

}

export async function markActive (itemId: number) {

}

export async function deleteItem (itemId: number) {

}

export async function searchItems (query: string): Promise<SearchResult<TodoItem>> {
  const db = tigris.getDatabase(DB_NAME)
  const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
  const request = { q: query }
  const results = await collection.search(request)
  //TODO: do not return undefined from TS client so whole op can be async
  if (results) {
    return Promise.resolve(results)
  }
  return Promise.reject()
}
