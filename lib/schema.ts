import { TigrisCollectionType } from '@tigrisdata/core/dist/types'

export interface TodoItem extends TigrisCollectionType {
  id?: number;
  text: string;
  completed: boolean;
}
