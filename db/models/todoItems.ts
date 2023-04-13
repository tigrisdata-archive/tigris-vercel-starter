import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisCollectionType,
  TigrisDataTypes
} from '@tigrisdata/core';

@TigrisCollection('todoItems')
export class TodoItem implements TigrisCollectionType {
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;

  @Field()
  @SearchField()
  text!: string;

  @Field()
  completed!: boolean;
}
