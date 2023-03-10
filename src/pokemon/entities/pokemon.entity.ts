// entities: representacion de lo que se grabara en la db
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Pokemon extends Document {
  @Prop({ unique: true, index: true })
  name: string

  @Prop({ unique: true, index: true })
  num: number
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
