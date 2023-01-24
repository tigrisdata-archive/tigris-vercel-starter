import { Field, PrimaryKey, TigrisCollection, TigrisDataTypes } from '@tigrisdata/core';

@TigrisCollection('todoItems')
export class TodoItem {
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;

  @Field()
  text!: string;

  @Field()
  completed!: boolean;
}
