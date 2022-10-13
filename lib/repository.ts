import { ReadRequestOptions } from '@tigrisdata/core/dist/types'
import tigris from './tigris'
import { Collection } from '@tigrisdata/core'
import { TodoItem } from './schema'

export const DB_NAME = 'tigris_vercel_starter'
export const COLLECTION_NAME = 'todoItems'

// TODO: Add error handling
export async function getAllItems (limit = 20, skip = 0): Promise<Array<TodoItem>> {
  const db = tigris.getDatabase(DB_NAME)
  const options = new ReadRequestOptions(limit, skip)
  const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
  const cursor = collection.findMany(undefined, undefined, undefined,
    options)
  return cursor.toArray()
}

export async function getItem (itemId: number): Promise<TodoItem> {
  return new Promise((resolve, reject) => {
    const db = tigris.getDatabase(DB_NAME)
    const collection: Collection<TodoItem> = db.getCollection(COLLECTION_NAME)
    collection.findOne({ id: itemId }).then(item => {
      if (item) {
        resolve(item)
      } else {
        reject()
      }
    })
  })
}

export async function addItem (item: TodoItem) {

}

export async function updateItem (item: TodoItem) {

}

export async function markCompleted (itemId: number) {

}

export async function markActive (itemId: number) {

}

export async function deleteItem (itemId: number) {

}

export async function searchItems (query: string, page = 1, perPage = 20) {

}
