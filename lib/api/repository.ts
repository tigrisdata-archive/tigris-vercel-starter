import { TigrisCollectionType } from '@tigrisdata/core/dist/types';
import tigris from '../tigris';
import { Collection } from '@tigrisdata/core'
import { TaskList } from '../task-list'

export interface TaskListSchema extends TigrisCollectionType {
  id?: number;
  name: string;
  tags: string;
  items: string;
}

const DB_NAME = "starter";
const COLLECTION_NAME = "taskLists";
const SEPARATOR = ", ";

export async function getAllLists(): Promise<Array<TaskList>> {
  const collection: Collection<TaskListSchema> = tigris.getDatabase(DB_NAME).getCollection(COLLECTION_NAME);
  const cursor = collection.findMany();
  const results: Array<TaskList> = new Array<TaskList>();
  for await (const list of cursor) {
    results.push(unMarshal(list));
  }

  return Promise.resolve(results);
}

function unMarshal(input: TaskListSchema): TaskList {
  return {
    id: input.id as number,
    name: input.name,
    items: input.items.split(SEPARATOR),
    tags: input.tags.split(SEPARATOR)
  }
}

function marshal(input: TaskList): TaskListSchema {
  return {
    id: input.id,
    name: input.name,
    items: input.items.join(SEPARATOR),
    tags: input.tags.join(SEPARATOR)
  }
}
