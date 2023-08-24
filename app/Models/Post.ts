import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    meta: { type: 'string', validation: schema.string([rules.minLength(3), rules.maxLength(20)]) },
  })
  public title: string

  @column({
    meta: { type: 'string', validation: schema.string([rules.minLength(3), rules.maxLength(200)]) },
  })
  public body: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, meta: { validation: 'test' } })
  public updatedAt: DateTime
}
