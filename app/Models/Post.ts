import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { createMetaValidation } from 'App/utils/validation/modelAttributesValidation'
import { DateTime } from 'luxon'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column(createMetaValidation({ type: 'string', minLength: 3, maxLength: 20 }))
  public title: string

  @column(
    createMetaValidation({
      type: 'string',
      minLength: 3,
      maxLength: 200,
    })
  )
  public body: string

  @column(
    createMetaValidation({
      type: 'number',
      exists: { table: 'users', column: 'id' },
    })
  )
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
